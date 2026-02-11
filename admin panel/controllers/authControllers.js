import AuthModel from "../models/authModel.js";
import OtpModel from "../models/otpmodels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendOTP } from "../utils/otp.js";

// ================= SIGNUP =================
export const signup = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        status: false,
        message: "Email and Password required"
      });
    }

    const existingUser = await AuthModel.findOne({ email });

    if (existingUser) {
      return res.json({
        status: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await AuthModel.create({
      email,
      password: hashedPassword
    });

    res.json({
      status: true,
      message: "Signup successful"
    });

  } catch (error) {

    console.log("Signup Error =>", error);   // 👈 Terminal me show karega

    res.status(500).json({
      status: false,
      message: "Signup failed",
      error: error.message
    });
  }
};


// ================= SIGNIN =================
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res.json({ status: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ status: false, message: "Incorrect password" });
    }

    const status = await sendOTP(email);

    if (status) {
      res.json({ status: true, message: "OTP sent successfully" });
    } else {
      res.json({ status: false, message: "OTP can't be sent" });
    }

  } catch (err) {
    res.json({ status: false, message: "Signin failed", error: err.message });
  }
};


// ================= VERIFY OTP =================
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = await OtpModel.findOne({ email, otp });

    if (!record) {
      return res.json({ status: false, message: "Invalid OTP" });
    }

    if (record.expiry < new Date()) {
      return res.json({ status: false, message: "OTP Expired" });
    }

    await OtpModel.deleteMany({ email });

    const user = await AuthModel.findOne({ email });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60
    });

    res.json({
      status: true,
      message: "OTP verified successfully",
      token
    });

  } catch (err) {
    res.json({ status: false, message: "Signin failed", error: err.message });
  }
};


// ================= CHANGE PASSWORD =================
export const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res.json({ status: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.json({ status: false, message: "Incorrect old password" });
    }

    const hashed = await bcrypt.hash(newPassword, 12);

    await AuthModel.updateOne(
      { email },
      { $set: { password: hashed } }
    );

    res.json({ status: true, message: "Password changed successfully" });

  } catch (err) {
    res.json({
      status: false,
      message: "Change password failed",
      error: err.message
    });
  }
};


// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res.json({ status: false, message: "User not found" });
    }

    const status = await sendOTP(email);

    res.json({
      status,
      message: status ? "OTP sent successfully" : "OTP sending failed"
    });

  } catch (err) {
    res.json({
      status: false,
      message: "Forgot password failed",
      error: err.message
    });
  }
};


// ================= CHANGE FORGOT PASSWORD =================
export const changeForgotPassword = async (req, res) => {
  const { email, password, otp } = req.body;

  try {
    const record = await OtpModel.findOne({ email, otp });

    if (!record) {
      return res.json({ status: false, message: "OTP is incorrect" });
    }

    if (record.expiry < new Date()) {
      return res.json({ status: false, message: "OTP expired" });
    }

    const hashed = await bcrypt.hash(password, 12);

    await AuthModel.updateOne(
      { email },
      { $set: { password: hashed } }
    );

    res.json({ status: true, message: "Password changed successfully" });

  } catch (err) {
    res.json({
      status: false,
      message: "Change forgot password failed",
      error: err.message
    });
  }
};


// ================= LOGOUT =================
export const logout = async (req, res) => {
  res.clearCookie("authToken");
  res.json({ status: true, message: "Logout successful" });
};


// ================= CHECK LOGIN STATUS =================
export const checkLoginStatus = async (req, res) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.json({ status: false, message: "Not logged in" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    res.json({
      status: true,
      message: "Already logged in",
      user: decoded
    });

  } catch (err) {
    res.json({ status: false, message: "Login expired" });
  }
};
