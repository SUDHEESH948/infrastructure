import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Default admin credentials (used only if database is completely empty on initial setup)
const DEFAULT_ADMIN = {
  email: (process.env.ADMIN_EMAIL || "admin@onsetinfra.com").toLowerCase().trim(),
  password: (process.env.ADMIN_PASSWORD || "admin123").trim(),
  username: "admin",
  name: "Onset Infra Administrator",
};

// Fast memory cache for instant sub-millisecond authentication
let cachedAdmin = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

/**
 * Fast lookup helper with in-memory caching and lean MongoDB query.
 */
const getOrInitAdmin = async (forceRefresh = false) => {
  if (!forceRefresh && cachedAdmin && Date.now() - lastCacheTime < CACHE_TTL_MS) {
    return cachedAdmin;
  }

  try {
    let admin = await User.findOne({ role: "admin" }).lean();
    if (!admin) {
      const created = await User.create({
        name: DEFAULT_ADMIN.name,
        username: DEFAULT_ADMIN.username,
        email: DEFAULT_ADMIN.email,
        password: DEFAULT_ADMIN.password,
        role: "admin",
      });
      admin = created.toObject();
      console.log(`[Auth] Created initial admin document in MongoDB: ${admin.email}`);
    }

    cachedAdmin = admin;
    lastCacheTime = Date.now();
    return admin;
  } catch (err) {
    console.error("[Auth] MongoDB admin lookup failed:", err.message);
    if (cachedAdmin) return cachedAdmin;
    throw err;
  }
};

// @desc    Fast Admin login - Verified against MongoDB Atlas
// @route   POST /api/auth/login
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email/username and password.",
      });
    }

    const input = String(email).toLowerCase().trim();
    const inputPass = String(password).trim();

    // Fast lean query / cache hit
    const admin = await getOrInitAdmin();

    if (!admin) {
      return res.status(500).json({
        success: false,
        message: "Admin account not found in database.",
      });
    }

    // Check email or username match against MongoDB document
    const isEmailMatch =
      input === admin.email.toLowerCase().trim() ||
      (admin.username && input === admin.username.toLowerCase().trim());

    // Check password match against MongoDB document
    const isPasswordMatch = inputPass === String(admin.password).trim();

    if (!isEmailMatch || !isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email/username or password.",
      });
    }

    // Authentication successful
    return res.status(200).json({
      success: true,
      message: "Admin authentication successful",
      user: {
        id: admin._id,
        name: admin.name || "Onset Infra Administrator",
        email: admin.email,
        username: admin.username,
        role: admin.role,
      },
      token: `admin_${Date.now()}`,
    });
  } catch (error) {
    console.error("Login database error:", error);
    return res.status(500).json({
      success: false,
      message: "Database connection error during login. Please try again.",
    });
  }
});

// @desc    Update admin email and/or password directly in MongoDB Atlas
// @route   PUT /api/auth/update-credentials
// @access  Public / Admin
router.put("/update-credentials", async (req, res) => {
  try {
    const { currentPassword, newEmail, newPassword } = req.body;

    if (!currentPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password is required to verify your identity.",
      });
    }

    if (!newEmail && !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please enter a new email or a new password to update in database.",
      });
    }

    // Fetch full Mongoose document for updating
    let admin = await User.findOne({ role: "admin" });

    if (!admin) {
      admin = await User.create({
        name: DEFAULT_ADMIN.name,
        username: DEFAULT_ADMIN.username,
        email: DEFAULT_ADMIN.email,
        password: DEFAULT_ADMIN.password,
        role: "admin",
      });
    }

    // Verify current password against MongoDB document (or default admin123 as recovery)
    const isCurrentValid =
      String(currentPassword).trim() === String(admin.password).trim() ||
      String(currentPassword).trim() === DEFAULT_ADMIN.password;

    if (!isCurrentValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    // Update email in MongoDB
    if (newEmail) {
      const cleanEmail = newEmail.toLowerCase().trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid email address.",
        });
      }

      const existing = await User.findOne({
        email: cleanEmail,
        _id: { $ne: admin._id },
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "This email address is already in use by another user.",
        });
      }
      admin.email = cleanEmail;
    }

    // Update password in MongoDB
    if (newPassword) {
      const cleanPassword = String(newPassword).trim();
      if (cleanPassword.length < 4) {
        return res.status(400).json({
          success: false,
          message: "New password must be at least 4 characters long.",
        });
      }
      admin.password = cleanPassword;
    }

    await admin.save();

    // Invalidate cache immediately so new credentials apply instantly
    cachedAdmin = null;
    lastCacheTime = 0;

    console.log(`[Auth] Credentials updated in MongoDB for: ${admin.email}`);

    return res.status(200).json({
      success: true,
      message: "Admin credentials successfully updated in MongoDB database.",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Update credentials database error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update admin credentials in database.",
    });
  }
});

// @desc    Get current admin profile directly from MongoDB Atlas
// @route   GET /api/auth/me
// @access  Public / Admin
router.get("/me", async (req, res) => {
  try {
    const admin = await getOrInitAdmin();
    if (admin) {
      return res.status(200).json({
        success: true,
        user: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          username: admin.username,
          role: admin.role,
        },
      });
    }
    return res.status(404).json({
      success: false,
      message: "Admin not found in database.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get admin profile from database.",
    });
  }
});

export default router;
