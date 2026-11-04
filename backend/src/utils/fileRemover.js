import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { deleteFileFromGridFS } from "../config/gridfs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_ROOT = path.resolve(__dirname, "../../uploads");

/**
 * Deletes an uploaded file from MongoDB GridFS and local disk if it exists.
 * Protects default assets (e.g. /projects/...) and prevents directory traversal.
 * Handles:
 *  - "/api/upload/file/60d5ec49f1b2c8a1d8e12345"
 *  - "/api/upload/raw/my-image.jpg"
 *  - "/uploads/gallery/photo.jpg"
 *  - "uploads/gallery/photo.jpg"
 *  - URLs with query params
 *
 * @param {string} imagePath
 * @returns {boolean} true if a file was deleted, false otherwise
 */
export const removeUploadedFile = async (imagePath) => {
  if (!imagePath || typeof imagePath !== "string") return false;

  try {
    // 1. Normalize slashes and decode URI
    let cleaned = decodeURIComponent(imagePath.trim()).replace(/\\/g, "/");

    // 2. Strip URL origin if present
    if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
      try {
        const parsed = new URL(cleaned);
        cleaned = parsed.pathname;
      } catch {
        // fallback
      }
    }

    // 3. Strip query strings and hash anchors
    cleaned = cleaned.split("?")[0].split("#")[0];

    // 4. Do not touch built-in public templates (e.g. /projects/building-construction.jpg)
    if (cleaned.startsWith("/projects/") || cleaned.startsWith("projects/")) {
      return false;
    }

    const filename = path.basename(cleaned);

    // 5. Delete from MongoDB Atlas GridFS
    try {
      await deleteFileFromGridFS(filename);
    } catch (err) {
      console.warn("GridFS delete warning:", err.message);
    }

    // 6. Delete from disk if inside uploads/ folder
    const uploadsIndex = cleaned.toLowerCase().indexOf("uploads/");
    if (uploadsIndex !== -1) {
      const relativeSubPath = cleaned.slice(uploadsIndex + "uploads/".length);
      if (relativeSubPath && relativeSubPath.trim() !== "") {
        const absolutePath = path.resolve(UPLOADS_ROOT, relativeSubPath);
        const normalizedRoot = path.normalize(UPLOADS_ROOT);
        const normalizedTarget = path.normalize(absolutePath);

        const isWindows = process.platform === "win32";
        const rootCheck = isWindows ? normalizedRoot.toLowerCase() : normalizedRoot;
        const targetCheck = isWindows ? normalizedTarget.toLowerCase() : normalizedTarget;

        if (targetCheck.startsWith(rootCheck) && path.basename(normalizedTarget).toLowerCase() !== ".gitkeep") {
          if (fs.existsSync(normalizedTarget)) {
            const stat = fs.statSync(normalizedTarget);
            if (stat.isFile()) {
              fs.unlinkSync(normalizedTarget);
              console.log(`🗑️ Successfully deleted uploaded image from disk: ${normalizedTarget}`);
              return true;
            }
          }
        }
      }
    }

    return true;
  } catch (error) {
    console.error(`⚠️ Failed to remove uploaded file (${imagePath}):`, error.message);
    return false;
  }
};
