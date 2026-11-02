import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_ROOT = path.resolve(__dirname, "../../uploads");

/**
 * Deletes an uploaded file from disk if it exists inside the uploads/ folder.
 * Protects default assets (e.g. /projects/...) and prevents directory traversal.
 * Handles:
 *  - "/uploads/gallery/photo.jpg"
 *  - "uploads/gallery/photo.jpg"
 *  - "http://localhost:5000/uploads/gallery/photo.jpg"
 *  - "uploads\\gallery\\photo.jpg"
 *  - URLs with query params, e.g. "/uploads/gallery/photo.jpg?t=123"
 *
 * @param {string} imagePath
 * @returns {boolean} true if a file was deleted, false otherwise
 */
export const removeUploadedFile = (imagePath) => {
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

    // 4. Must target uploads directory
    const uploadsIndex = cleaned.toLowerCase().indexOf("uploads/");
    if (uploadsIndex === -1) {
      return false;
    }

    // 5. Extract relative path after "uploads/"
    const relativeSubPath = cleaned.slice(uploadsIndex + "uploads/".length);
    if (!relativeSubPath || relativeSubPath.trim() === "") {
      return false;
    }

    // 6. Resolve absolute path and normalize
    const absolutePath = path.resolve(UPLOADS_ROOT, relativeSubPath);
    const normalizedRoot = path.normalize(UPLOADS_ROOT);
    const normalizedTarget = path.normalize(absolutePath);

    // 7. Security check: strictly inside UPLOADS_ROOT (case-insensitive on Windows)
    const isWindows = process.platform === "win32";
    const rootCheck = isWindows ? normalizedRoot.toLowerCase() : normalizedRoot;
    const targetCheck = isWindows ? normalizedTarget.toLowerCase() : normalizedTarget;

    if (!targetCheck.startsWith(rootCheck)) {
      console.warn("⚠️ Security warning: Blocked path traversal attempt:", imagePath);
      return false;
    }

    // 8. Protect placeholder files
    if (path.basename(normalizedTarget).toLowerCase() === ".gitkeep") {
      return false;
    }

    // 9. Check existence and remove
    if (fs.existsSync(normalizedTarget)) {
      const stat = fs.statSync(normalizedTarget);
      if (stat.isFile()) {
        fs.unlinkSync(normalizedTarget);
        console.log(`🗑️ Successfully deleted uploaded image from disk: ${normalizedTarget}`);
        return true;
      }
    }
  } catch (error) {
    console.error(`⚠️ Failed to remove uploaded file (${imagePath}):`, error.message);
  }
  return false;
};
