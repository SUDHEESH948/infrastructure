import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./src/config/db.js";
import { streamFileFromGridFS, migrateLocalUploadsToGridFS } from "./src/config/gridfs.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import serviceRoutes from "./src/routes/serviceRoutes.js";
import galleryRoutes from "./src/routes/galleryRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js";

// Load environment variables reliably from backend directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

// Initialize Express
const app = express();

// Connect to MongoDB Atlas and initialize GridFS storage
connectDB().then((connected) => {
  if (connected) {
    migrateLocalUploadsToGridFS();
  }
});

// CORS configuration (supports localhost, Vercel deployments, and production URLs)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-side proxies)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.includes("vercel.app")
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive fallback for deployment
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body Parser Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// HTTP Request Logger
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Infrastructure Backend API is operational",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Static Files (Uploaded images on disk with MongoDB Atlas GridFS fallback)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/uploads/*", (req, res) => {
  const filename = path.basename(req.path);
  streamFileFromGridFS(filename, req, res);
});

// API Routes
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Onset Infra API is running...");
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  console.log(`📡 Projects API: http://localhost:${PORT}/api/projects`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use by another process.`);
    console.error(`👉 Tip: Run 'npx kill-port ${PORT}' or restart the terminal to free port ${PORT}.`);
  } else {
    console.error("Server error:", error);
  }
});
