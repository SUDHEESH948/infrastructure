import express from "express";

const router = express.Router();

// Default admin credentials (can also be configured via .env: ADMIN_EMAIL, ADMIN_PASSWORD)
const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL || "admin@onsetinfra.com",
  password: process.env.ADMIN_PASSWORD || "admin123",
  username: "admin",
  name: "Onset Infra Administrator",
};

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email/username and password",
    });
  }

  const isEmailMatch =
    email.toLowerCase().trim() === DEFAULT_ADMIN.email.toLowerCase() ||
    email.toLowerCase().trim() === DEFAULT_ADMIN.username;
  const isPasswordMatch = password.trim() === DEFAULT_ADMIN.password;

  if (isEmailMatch && isPasswordMatch) {
    return res.status(200).json({
      success: true,
      message: "Admin authentication successful",
      user: {
        name: DEFAULT_ADMIN.name,
        email: DEFAULT_ADMIN.email,
        role: "admin",
      },
      token: `admin_${Date.now()}`,
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials. (Default: admin@onsetinfra.com / admin123)",
  });
});

export default router;

