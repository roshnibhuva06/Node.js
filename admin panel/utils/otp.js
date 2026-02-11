import nodemailer from "nodemailer";
import OtpModel from "../models/otpmodels.js";
import dotenv from "dotenv";
dotenv.config();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendOTP = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  const expiry = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes

  try {
    // save OTP in DB
    await OtpModel.create({ email, otp, expiry });

   
    return true;
  } catch (err) {
    console.error("OTP send error:", err.message);
    return false;
  }
};