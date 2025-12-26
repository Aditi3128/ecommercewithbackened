// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import { generateOTP } from "../utils/generateOtp.js";
// import sendEmail from "../utils/sendEmail.js";


// /* ================= REGISTER ================= */
// export const registerUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password)
//       return res.status(400).json({ message: "All fields are required" });

//     const existingUser = await User.findOne({ email: email.toLowerCase() });
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       email: email.toLowerCase(),
//       password: hashedPassword,
//     });

//     res.status(201).json({ message: "Registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ================= LOGIN ================= */
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid credentials" });

//     res.json({ message: "Login successful" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ================= FORGOT PASSWORD ================= */
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const otp = generateOtp();

//     user.otp = otp;
//     user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 min
//     await user.save();

//     // 🔥 THIS LINE WAS FAILING EARLIER
//     await sendEmail({
//       to: user.email,
//       subject: "Password Reset OTP",
//       html: `<h2>Your OTP is: ${otp}</h2><p>Valid for 10 minutes</p>`,
//     });

//     return res.status(200).json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("❌ Forgot Password Error:", error);
//     return res.status(500).json({ message: "Failed to send OTP" });
//   }
// };


// /* ================= VERIFY OTP ================= */
// export const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email: email.toLowerCase() });

//     if (
//       !user ||
//       user.otp !== otp ||
//       user.otpExpiry < Date.now()
//     ) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     res.json({ message: "OTP verified" });
//   } catch (err) {
//     res.status(500).json({ message: "OTP verification failed" });
//   }
// };

// /* ================= RESET PASSWORD ================= */
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     const user = await User.findOne({ email: email.toLowerCase() });

//     if (
//       !user ||
//       user.otp !== otp ||
//       user.otpExpiry < Date.now()
//     ) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     user.password = await bcrypt.hash(newPassword, 10);
//     user.otp = null;
//     user.otpExpiry = null;

//     await user.save();

//     res.json({ message: "Password reset successful" });
//   } catch (err) {
//     res.status(500).json({ message: "Password reset failed" });
//   }
// };
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateOtp from "../utils/generateOtp.js";   // ✅ FIXED
import sendEmail from "../utils/sendEmail.js";

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOtp(); // ✅ NOW DEFINED

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Password Reset OTP",
      html: `
        <h2>Password Reset OTP</h2>
        <p>Your OTP is: <b>${otp}</b></p>
        <p>This OTP is valid for 10 minutes.</p>
      `,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("❌ Forgot Password Error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

/* ================= VERIFY OTP ================= */
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP verified" });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ message: "OTP verification failed" });
  }
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Password reset failed" });
  }
};
