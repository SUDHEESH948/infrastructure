import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_ROOT = path.join(__dirname, "../../uploads");

// Ensure upload directories exist
const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};
ensureDirExists(UPLOADS_ROOT);

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subfolder = req.query.folder === "projects" ? "projects" : req.query.folder === "gallery" ? "gallery" : "";
    const targetDir = subfolder ? path.join(UPLOADS_ROOT, subfolder) : UPLOADS_ROOT;
    ensureDirExists(targetDir);
    cb(null, targetDir);
  },
  filename: (req, file, cb) => {
    // Generate clean unique filename: image-1719827361928-original.jpg
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanBase = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .slice(0, 30);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e4);
    cb(null, `${cleanBase}-${uniqueSuffix}${ext}`);
  },
});

// Image File Filter
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|webp|avif|gif/;
  const isExtValid = allowedExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );
  const isMimeValid = file.mimetype.startsWith("image/");

  if (isExtValid && isMimeValid) {
    return cb(null, true);
  }
  cb(new Error("Only image files (.jpg, .jpeg, .png, .webp, .avif, .gif) are allowed!"));
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter,
});

const router = express.Router();

// @desc    Upload single image
// @route   POST /api/upload
// @access  Admin
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please attach an image file to upload",
    });
  }

  // Construct relative URL for web client
  const subfolder = req.query.folder === "projects" ? "projects/" : req.query.folder === "gallery" ? "gallery/" : "";
  const relativePath = `/uploads/${subfolder}${req.file.filename}`;

  res.status(200).json({
    success: true,
    message: "Image uploaded and stored successfully",
    filename: req.file.filename,
    filePath: relativePath,
    url: relativePath,
    size: req.file.size,
  });
});

export default router;

