import express from "express";
import multer from "multer";
import path from "path";
import {
  uploadBufferToGridFS,
  streamFileFromGridFS,
  deleteFileFromGridFS,
} from "../config/gridfs.js";
import { removeUploadedFile } from "../utils/fileRemover.js";

// Use memory storage for direct streaming to MongoDB Atlas GridFS
const storage = multer.memoryStorage();

// Media File Filter (Images and Videos)
const fileFilter = (req, file, cb) => {
  const allowedImageExt = /jpeg|jpg|png|webp|avif|gif|svg/;
  const allowedVideoExt = /mp4|webm|mov|mkv|ogg|avi/;
  const ext = path.extname(file.originalname).toLowerCase().replace(".", "");

  const isImage = file.mimetype.startsWith("image/") || allowedImageExt.test(ext);
  const isVideo = file.mimetype.startsWith("video/") || allowedVideoExt.test(ext);

  if (isImage || isVideo) {
    return cb(null, true);
  }
  cb(new Error("Only image files (.jpg, .jpeg, .png, .webp) and video files (.mp4, .webm, .mov) are allowed!"));
};

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit for high-res images and videos
  fileFilter,
});

const router = express.Router();

// Helper middleware for single media upload (image, video, or file field name)
const singleMediaUpload = (req, res, next) => {
  const uploader = upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]);
  uploader(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    req.file = req.files?.image?.[0] || req.files?.video?.[0] || req.files?.file?.[0] || null;
    next();
  });
};

// Helper middleware for multiple media upload (images, videos, or files field name)
const multipleMediaUpload = (req, res, next) => {
  const uploader = upload.fields([
    { name: "images", maxCount: 30 },
    { name: "videos", maxCount: 30 },
    { name: "files", maxCount: 30 },
  ]);
  uploader(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    const collected = [
      ...(req.files?.images || []),
      ...(req.files?.videos || []),
      ...(req.files?.files || []),
    ];
    req.files = collected;
    next();
  });
};

// @desc    Upload single media (image or video) directly into MongoDB Atlas GridFS
// @route   POST /api/upload
// @access  Admin
router.post("/", singleMediaUpload, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please attach an image or video file to upload",
    });
  }

  try {
    const subfolder = req.query.folder === "projects" ? "projects" : req.query.folder === "gallery" ? "gallery" : "general";
    const isVideo = req.file.mimetype.startsWith("video/") || /\.(mp4|webm|mov|mkv|ogg|avi)$/i.test(req.file.originalname);
    const ext = path.extname(req.file.originalname).toLowerCase();
    const cleanBase = path
      .basename(req.file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .slice(0, 30);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e4);
    const filename = `${cleanBase}-${uniqueSuffix}${ext}`;

    const storedFile = await uploadBufferToGridFS({
      buffer: req.file.buffer,
      filename,
      mimetype: req.file.mimetype,
      metadata: {
        folder: subfolder,
        originalName: req.file.originalname,
        mediaType: isVideo ? "video" : "image",
      },
    });

    const fileUrl = `/api/upload/file/${storedFile.fileId}`;

    res.status(200).json({
      success: true,
      message: `${isVideo ? "Video" : "Image"} permanently stored in MongoDB Atlas`,
      fileId: storedFile.fileId,
      filename: storedFile.filename,
      filePath: fileUrl,
      url: fileUrl,
      size: storedFile.size,
      mediaType: isVideo ? "video" : "image",
      mimetype: req.file.mimetype,
    });
  } catch (error) {
    console.error("MongoDB Upload Error:", error);
    res.status(500).json({
      success: false,
      message: `Failed to store media in MongoDB Atlas: ${error.message}`,
    });
  }
});

// @desc    Upload multiple media files (up to 30 images / videos) into MongoDB Atlas GridFS
// @route   POST /api/upload/multiple
// @access  Admin
router.post("/multiple", multipleMediaUpload, async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please attach at least one media file to upload",
    });
  }

  try {
    const subfolder = req.query.folder === "projects" ? "projects" : req.query.folder === "gallery" ? "gallery" : "general";

    const files = await Promise.all(
      req.files.map(async (file) => {
        const isVideo = file.mimetype.startsWith("video/") || /\.(mp4|webm|mov|mkv|ogg|avi)$/i.test(file.originalname);
        const ext = path.extname(file.originalname).toLowerCase();
        const cleanBase = path
          .basename(file.originalname, ext)
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")
          .slice(0, 30);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e4);
        const filename = `${cleanBase}-${uniqueSuffix}${ext}`;

        const stored = await uploadBufferToGridFS({
          buffer: file.buffer,
          filename,
          mimetype: file.mimetype,
          metadata: {
            folder: subfolder,
            originalName: file.originalname,
            mediaType: isVideo ? "video" : "image",
          },
        });

        const fileUrl = `/api/upload/file/${stored.fileId}`;
        return {
          fileId: stored.fileId,
          filename: stored.filename,
          filePath: fileUrl,
          url: fileUrl,
          size: stored.size,
          mediaType: isVideo ? "video" : "image",
          mimetype: file.mimetype,
          originalName: file.originalname,
        };
      })
    );

    res.status(200).json({
      success: true,
      message: `${files.length} media file(s) permanently stored in MongoDB Atlas`,
      count: files.length,
      files,
    });
  } catch (error) {
    console.error("MongoDB Multiple Upload Error:", error);
    res.status(500).json({
      success: false,
      message: `Failed to store media files in MongoDB: ${error.message}`,
    });
  }
});

// @desc    Stream or download media file from MongoDB GridFS by ID or filename
// @route   GET /api/upload/file/:id
// @access  Public
router.get("/file/:id", (req, res) => {
  streamFileFromGridFS(req.params.id, req, res);
});

// @desc    Stream or download media file from MongoDB GridFS by filename
// @route   GET /api/upload/raw/:filename
// @access  Public
router.get("/raw/:filename", (req, res) => {
  streamFileFromGridFS(req.params.filename, req, res);
});

// @desc    Delete media file from MongoDB GridFS and local disk
// @route   DELETE /api/upload
// @access  Admin
router.delete("/", async (req, res) => {
  const filePath = req.query.path || req.body.path || req.query.id || req.body.id;

  if (!filePath) {
    return res.status(400).json({ success: false, message: "File path or ID is required" });
  }

  // 1. Try deleting from MongoDB GridFS
  const cleanIdOrName = path.basename(filePath);
  const deletedFromMongo = await deleteFileFromGridFS(cleanIdOrName);

  // 2. Also try deleting from local disk if it existed locally
  const deletedFromDisk = removeUploadedFile(filePath);

  if (deletedFromMongo || deletedFromDisk) {
    return res.status(200).json({
      success: true,
      message: "File deleted successfully from MongoDB storage",
    });
  }

  return res.status(404).json({
    success: false,
    message: "File not found in storage",
  });
});

export default router;
