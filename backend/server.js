import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./src/config/db.js";
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

// Connect to MongoDB Atlas
connectDB();

// CORS configuration (supports http://localhost:5173)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Dev-friendly fallback
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body Parser Middleware
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

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

// Static Files (Uploaded images in /uploads folder)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  console.log(`📡 Projects API: http://localhost:${PORT}/api/projects`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
});
