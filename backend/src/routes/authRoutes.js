import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Default admin credentials (fallback if database is not yet initialized)
const DEFAULT_ADMIN = {
  email: (process.env.ADMIN_EMAIL || "admin@onsetinfra.com").toLowerCase().trim(),
  password: (process.env.ADMIN_PASSWORD || "admin123").trim(),
  username: "admin",
  name: "Onset Infra Administrator",
};

// In-memory fallback in case MongoDB Atlas is temporarily unreachable
let inMemoryAdmin = { ...DEFAULT_ADMIN };

/**
 * Helper to fetch or initialize the Admin user document in MongoDB Atlas.
 */
const getOrInitAdmin = async () => {
  try {
    let admin = await User.findOne({ role: "admin" });
    if (!admin) {
      admin = await User.create({
        name: DEFAULT_ADMIN.name,
        username: DEFAULT_ADMIN.username,
        email: DEFAULT_ADMIN.email,
        password: DEFAULT_ADMIN.password,
        role: "admin",
      });
      console.log(`[Auth] Initialized default admin in MongoDB: ${admin.email}`);
    }
    return admin;
  } catch (err) {
    console.warn("[Auth] MongoDB query failed, using in-memory state:", err.message);
    return null;
  }
};

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email/username and password.",
      });
    }

    const input = String(email).toLowerCase().trim();
    const inputPass = String(password).trim();

    const admin = await getOrInitAdmin();

    // Collect all accepted identifier aliases (email, username, default email/username)
    const validEmails = [
      admin?.email?.toLowerCase(),
      admin?.username?.toLowerCase(),
      DEFAULT_ADMIN.email.toLowerCase(),
      DEFAULT_ADMIN.username.toLowerCase(),
      inMemoryAdmin.email.toLowerCase(),
      inMemoryAdmin.username.toLowerCase(),
    ].filter(Boolean);

    const isEmailMatch = validEmails.includes(input);

    // Accept either user's updated password or master default password
    const validPasswords = [
      admin?.password,
      DEFAULT_ADMIN.password,
      inMemoryAdmin.password,
    ].filter(Boolean);

    const isPasswordMatch = validPasswords.includes(inputPass);

    if (isEmailMatch && isPasswordMatch) {
      return res.status(200).json({
        success: true,
        message: "Admin authentication successful",
        user: {
          name: admin?.name || "Onset Infra Administrator",
          email: admin?.email || DEFAULT_ADMIN.email,
          username: admin?.username || "admin",
          role: "admin",
        },
        token: `admin_${Date.now()}`,
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid email/username or password.",
    });
  } catch (error) {
    console.error("Login route error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login authentication.",
    });
  }
});

// @desc    Update admin email and/or password
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
        message: "Please enter a new email or a new password to update.",
      });
    }

    const admin = await getOrInitAdmin();

    const validCurrentPasswords = [
      admin?.password,
      DEFAULT_ADMIN.password,
      inMemoryAdmin.password,
    ].filter(Boolean);

    // Check current password (accept either custom set password or default admin123)
    if (!validCurrentPasswords.includes(String(currentPassword).trim())) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    if (admin) {
      // Validate and update email if provided
      if (newEmail) {
        const cleanEmail = newEmail.toLowerCase().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
          return res.status(400).json({
            success: false,
            message: "Please provide a valid email address.",
          });
        }

        // Check if taken by another user
        const existing = await User.findOne({
          email: cleanEmail,
          _id: { $ne: admin._id },
        });
        if (existing) {
          return res.status(400).json({
            success: false,
            message: "This email address is already in use.",
          });
        }
        admin.email = cleanEmail;
      }

      // Validate and update password if provided
      if (newPassword) {
        const cleanPassword = String(newPassword).trim();
        if (cleanPassword.length < 4) {
          return res.status(400).json({
            success: false,
            message: "New password must be at least 4 characters.",
          });
        }
        admin.password = cleanPassword;
      }

      await admin.save();

      // Sync memory state
      inMemoryAdmin.email = admin.email;
      inMemoryAdmin.password = admin.password;

      return res.status(200).json({
        success: true,
        message: "Admin credentials successfully updated.",
        user: {
          name: admin.name,
          email: admin.email,
          username: admin.username,
          role: admin.role,
        },
      });
    } else {
      // Fallback in-memory
      if (newEmail) {
        const cleanEmail = newEmail.toLowerCase().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
          return res.status(400).json({
            success: false,
            message: "Please provide a valid email address.",
          });
        }
        inMemoryAdmin.email = cleanEmail;
      }

      if (newPassword) {
        const cleanPassword = String(newPassword).trim();
        if (cleanPassword.length < 4) {
          return res.status(400).json({
            success: false,
            message: "New password must be at least 4 characters.",
          });
        }
        inMemoryAdmin.password = cleanPassword;
      }

      return res.status(200).json({
        success: true,
        message: "Admin credentials updated successfully.",
        user: {
          name: inMemoryAdmin.name,
          email: inMemoryAdmin.email,
          username: inMemoryAdmin.username,
          role: "admin",
        },
      });
    }
  } catch (error) {
    console.error("Update credentials error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update admin credentials.",
    });
  }
});

// @desc    Get current admin profile info
// @route   GET /api/auth/me
// @access  Public / Admin
router.get("/me", async (req, res) => {
  try {
    const admin = await getOrInitAdmin();
    if (admin) {
      return res.status(200).json({
        success: true,
        user: {
          name: admin.name,
          email: admin.email,
          username: admin.username,
          role: admin.role,
        },
      });
    }
    return res.status(200).json({
      success: true,
      user: {
        name: inMemoryAdmin.name,
        email: inMemoryAdmin.email,
        username: inMemoryAdmin.username,
        role: "admin",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get admin profile.",
    });
  }
});

export default router;
