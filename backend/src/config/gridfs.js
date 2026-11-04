import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_ROOT = path.resolve(__dirname, "../../uploads");

let gfsBucket = null;

/**
 * Returns the GridFSBucket instance connected to MongoDB Atlas.
 */
export const getGridFSBucket = () => {
  if (gfsBucket) return gfsBucket;
  if (!mongoose.connection || mongoose.connection.readyState !== 1 || !mongoose.connection.db) {
    throw new Error("MongoDB connection is not open yet. Cannot initialize GridFS.");
  }
  gfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });
  return gfsBucket;
};

/**
 * Uploads a buffer directly into MongoDB Atlas via GridFS.
 *
 * @param {Object} options
 * @param {Buffer} options.buffer
 * @param {string} options.filename
 * @param {string} options.mimetype
 * @param {Object} options.metadata
 * @returns {Promise<Object>}
 */
export const uploadBufferToGridFS = ({ buffer, filename, mimetype, metadata = {} }) => {
  return new Promise((resolve, reject) => {
    try {
      const bucket = getGridFSBucket();
      const cleanFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "-");

      const uploadStream = bucket.openUploadStream(cleanFilename, {
        contentType: mimetype || "application/octet-stream",
        metadata: {
          ...metadata,
          uploadedAt: new Date(),
          originalName: filename,
        },
      });

      uploadStream.on("error", (err) => {
        reject(err);
      });

      uploadStream.on("finish", () => {
        resolve({
          fileId: uploadStream.id.toString(),
          id: uploadStream.id,
          filename: cleanFilename,
          size: buffer.length,
          mimetype: mimetype || "application/octet-stream",
          metadata: {
            ...metadata,
            originalName: filename,
          },
        });
      });

      uploadStream.end(buffer);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Streams a file from MongoDB GridFS with HTTP 206 Partial Content support
 * (critical for smooth video streaming, seeking, and browser audio/video players).
 *
 * @param {string} identifier - ObjectId string or exact filename
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
export const streamFileFromGridFS = async (identifier, req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database connection not ready to stream media",
      });
    }

    const bucket = getGridFSBucket();

    // 1. Try finding by ObjectId or by filename
    let files = [];
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      files = await bucket.find({ _id: new mongoose.Types.ObjectId(identifier) }).toArray();
    }

    if (!files || files.length === 0) {
      // Try searching by filename (or relative subfolder stripped)
      const cleanName = path.basename(identifier);
      files = await bucket.find({ filename: cleanName }).toArray();
    }

    if (!files || files.length === 0) {
      // Try matching originalName inside metadata
      files = await bucket.find({ "metadata.originalName": path.basename(identifier) }).toArray();
    }

    if (!files || files.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Media file "${identifier}" not found in MongoDB Atlas storage`,
      });
    }

    const file = files[0];
    const contentType = file.contentType || "application/octet-stream";
    const fileSize = file.length;

    // 2. Handle HTTP Range Requests for videos (seeking / partial content)
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize) {
        res.setHeader("Content-Range", `bytes */${fileSize}`);
        return res.status(416).send("Requested Range Not Satisfiable");
      }

      const chunkSize = end - start + 1;
      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": contentType,
      });

      const downloadStream = bucket.openDownloadStream(file._id, {
        start,
        end: end + 1,
      });

      downloadStream.on("error", (err) => {
        if (!res.headersSent) res.status(500).end();
      });

      return downloadStream.pipe(res);
    }

    // 3. Standard full content delivery (images, full documents)
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": contentType,
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable",
    });

    const downloadStream = bucket.openDownloadStream(file._id);
    downloadStream.on("error", (err) => {
      if (!res.headersSent) res.status(500).end();
    });

    return downloadStream.pipe(res);
  } catch (error) {
    console.error("Stream GridFS error:", error.message);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

/**
 * Deletes a file from MongoDB GridFS by ID or filename.
 */
export const deleteFileFromGridFS = async (identifier) => {
  try {
    if (mongoose.connection.readyState !== 1) return false;
    const bucket = getGridFSBucket();

    let files = [];
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      files = await bucket.find({ _id: new mongoose.Types.ObjectId(identifier) }).toArray();
    }
    if (!files || files.length === 0) {
      const cleanName = path.basename(identifier);
      files = await bucket.find({ filename: cleanName }).toArray();
    }

    if (files && files.length > 0) {
      for (const f of files) {
        await bucket.delete(f._id);
        console.log(`🗑️ Deleted file from MongoDB GridFS: ${f.filename} (${f._id})`);
      }
      return true;
    }
    return false;
  } catch (err) {
    console.warn("Delete GridFS file error:", err.message);
    return false;
  }
};

/**
 * Automatically migrates existing local files from backend/uploads/ into MongoDB Atlas GridFS.
 * Ensures that all existing project photos/videos are permanently stored in MongoDB Atlas.
 */
export const migrateLocalUploadsToGridFS = async () => {
  try {
    if (mongoose.connection.readyState !== 1) return;
    const bucket = getGridFSBucket();

    const foldersToScan = [
      path.join(UPLOADS_ROOT, "projects"),
      path.join(UPLOADS_ROOT, "gallery"),
      UPLOADS_ROOT,
    ];

    let migratedCount = 0;

    for (const folder of foldersToScan) {
      if (!fs.existsSync(folder)) continue;
      const entries = fs.readdirSync(folder, { withFileTypes: true });

      for (const entry of entries) {
        if (!entry.isFile() || entry.name.startsWith(".")) continue;

        const filePath = path.join(folder, entry.name);
        const filename = entry.name;

        // Check if file is already stored in MongoDB GridFS
        const existing = await bucket.find({ filename }).toArray();
        if (existing && existing.length > 0) {
          continue; // Already migrated
        }

        const ext = path.extname(filename).toLowerCase();
        let mimetype = "application/octet-stream";
        if (ext === ".jpg" || ext === ".jpeg") mimetype = "image/jpeg";
        else if (ext === ".png") mimetype = "image/png";
        else if (ext === ".webp") mimetype = "image/webp";
        else if (ext === ".mp4") mimetype = "video/mp4";
        else if (ext === ".mov") mimetype = "video/quicktime";
        else if (ext === ".webm") mimetype = "video/webm";

        const buffer = fs.readFileSync(filePath);
        const subfolder = folder.includes("projects") ? "projects" : folder.includes("gallery") ? "gallery" : "general";

        await uploadBufferToGridFS({
          buffer,
          filename,
          mimetype,
          metadata: {
            migratedFromDisk: true,
            folder: subfolder,
          },
        });

        migratedCount++;
        console.log(`📦 Successfully migrated local file to MongoDB Atlas: ${filename}`);
      }
    }

    if (migratedCount > 0) {
      console.log(`🎉 Finished migrating ${migratedCount} local media files into MongoDB Atlas!`);
    }
  } catch (err) {
    console.warn("⚠️ Media migration to MongoDB error:", err.message);
  }
};
