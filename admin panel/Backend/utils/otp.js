import nodemailer from "nodemailer";
import { OtpCollection } from "../models/otp_models.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

export const sendHospitalOTP = async (email) => {
    try {

        const otp = generateOTP();

        const expiryAt = new Date(Date.now() + 2 * 60 * 1000);
        await OtpCollection.create
        ({
            email, otp, expiryAt});

        await transporter.sendMail({
            from: `Hospital Management System <${process.env.EMAIL}>`,
            to: email,
            subject: "Hospital OTP Verification",
            text: `Your OTP is ${otp}. It is valid for 2 minutes.`});
 return {
            status: true,
            message: "OTP sent successfully"};

    } catch (error) {
        return {
            status: false,
            message: error.message
        };
    }
};
