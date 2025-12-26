import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

/* ================= AUTH ROUTES ================= */

// ✅ Test route (debug purpose)
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes working ✅" });
});

// 🔐 Register
router.post("/register", registerUser);

// 🔐 Login
router.post("/login", loginUser);

// 🔐 Forgot password flow
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
