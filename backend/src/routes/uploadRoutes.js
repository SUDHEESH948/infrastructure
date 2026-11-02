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
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for photos (3MP+) and videos
  fileFilter,
});

const router = express.Router();

import { removeUploadedFile } from "../utils/fileRemover.js";

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

// @desc    Upload single media (image or video)
// @route   POST /api/upload
// @access  Admin
router.post("/", singleMediaUpload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please attach an image or video file to upload",
    });
  }

  // Construct relative URL for web client
  const subfolder = req.query.folder === "projects" ? "projects/" : req.query.folder === "gallery" ? "gallery/" : "";
  const relativePath = `/uploads/${subfolder}${req.file.filename}`;
  const isVideo = req.file.mimetype.startsWith("video/") || /\.(mp4|webm|mov|mkv|ogg|avi)$/i.test(req.file.filename);

  res.status(200).json({
    success: true,
    message: `${isVideo ? "Video" : "Image"} uploaded and stored successfully`,
    filename: req.file.filename,
    filePath: relativePath,
    url: relativePath,
    size: req.file.size,
    mediaType: isVideo ? "video" : "image",
    mimetype: req.file.mimetype,
  });
});

// @desc    Upload multiple media files (up to 30 images / videos)
// @route   POST /api/upload/multiple
// @access  Admin
router.post("/multiple", multipleMediaUpload, (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please attach at least one media file to upload",
    });
  }

  const subfolder =
    req.query.folder === "projects"
      ? "projects/"
      : req.query.folder === "gallery"
      ? "gallery/"
      : "";

  const files = req.files.map((file) => {
    const relativePath = `/uploads/${subfolder}${file.filename}`;
    const isVideo = file.mimetype.startsWith("video/") || /\.(mp4|webm|mov|mkv|ogg|avi)$/i.test(file.filename);
    return {
      filename: file.filename,
      filePath: relativePath,
      url: relativePath,
      size: file.size,
      mediaType: isVideo ? "video" : "image",
      mimetype: file.mimetype,
      originalName: file.originalname,
    };
  });

  res.status(200).json({
    success: true,
    message: `${files.length} media file(s) uploaded and stored successfully`,
    count: files.length,
    files,
  });
});

// @desc    Delete uploaded image file from disk
// @route   DELETE /api/upload
// @access  Admin
router.delete("/", (req, res) => {
  const filePath = req.query.path || req.body.path;

  if (!filePath) {
    return res.status(400).json({ success: false, message: "File path is required" });
  }

  const deleted = removeUploadedFile(filePath);

  if (deleted) {
    return res.status(200).json({ success: true, message: "File deleted from uploads folder" });
  }

  return res.status(404).json({ success: false, message: "File not found or not in uploads folder" });
});

export default router;

