import { AuthCollection } from '../models/authmodel.js';
import bcrypt from 'bcrypt';
import { OtpCollection } from '../models/otpmodels.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


// 🏥 Signup (Admin / Doctor / Staff)
export const signup = async (req, res) => {

    const { email, password, role } = req.body;

    try {

        const exist = await AuthCollection.findOne({ email });
        if (exist) {
            return res.json({ status: false, message: "User already exists !" });
        }

        const hashed = await bcrypt.hash(password, 12);

        const user = await UserCollection.create({ email, role });

        await AuthCollection.create({
            email,
            password: hashed,
            user: user._id,
            role
        });

        res.status(201).json({
            status: true,
            message: "Hospital user registered successfully !"
        });

    } catch (err) {
        res.json({ status: false, message: err.message });
    }
};



// 🏥 Signin
export const signin = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await AuthCollection.findOne({ email });

        if (!user) {
            return res.json({ status: false, message: "User not found, please signup !" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ status: false, message: "Password is incorrect !" });
        }

        // OTP Send
        const isOtpSent = await otpSender(email);
        return res.json(isOtpSent);

    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
    }
};



// 🏥 Signout
export const signout = (req, res) => {

    try {

        res.clearCookie("auth_token");

        res.json({
            status: true,
            message: "Signout successfully !"
        });

    } catch (err) {
        res.json({ status: false, message: "Signout failed !" });
    }
};



// 🏥 Verify OTP + Create JWT
export const verifyOTP = async (req, res) => {

    const { email, otp } = req.body;

    try {

        const record = await OtpCollection.findOne({ email, otp });

        if (!record) {
            return res.json({ status: false, message: "OTP is incorrect !" });
        }

        if (record.expiryAt < new Date()) {
            return res.json({ status: false, message: "OTP is expired !" });
        }

        await OtpCollection.deleteMany({ email });

        const user = await AuthCollection.findOne({ email });

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.cookie("auth_token", token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            sameSite: "strict"
        });

        res.json({
            status: true,
            message: "OTP verified & Signin successful !"
        });

    } catch (err) {
        res.json({ status: false, message: err.message });
    }
};



// 🏥 Change Password
export const changePassword = async (req, res) => {

    const { email, oldPassword, newPassword } = req.body;

    try {

        const user = await AuthCollection.findOne({ email });

        if (!user) {
            return res.json({ status: false, message: "User not found !" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.json({ status: false, message: "Old password is incorrect !" });
        }

        const hashed = await bcrypt.hash(newPassword, 12);

        await AuthCollection.updateOne(
            { email },
            { $set: { password: hashed } }
        );

        return res.json({
            status: true,
            message: "Password changed successfully !"
        });

    } catch (err) {
        return res.json({ status: false, message: err.message });
    }
};



// 🏥 Forget Password
export const forgetPassword = async (req, res) => {

    const { email } = req.body;

    const user = await AuthCollection.findOne({ email });

    if (!user) {
        return res.json({ status: false, message: "User not found !" });
    }

    const isOtpSent = await otpSender(email);
    return res.json(isOtpSent);
};



// 🏥 Reset Password After OTP
export const verifyOtpForCreatePassword = async (req, res) => {

    const { email, otp, newPassword } = req.body;

    try {

        const record = await OtpCollection.findOne({ email, otp });

        if (!record) {
            return res.json({ status: false, message: "OTP incorrect !" });
        }

        if (record.expiryAt < new Date()) {
            return res.json({ status: false, message: "OTP expired !" });
        }

        const hashed = await bcrypt.hash(newPassword, 12);

        await AuthCollection.updateOne(
            { email },
            { $set: { password: hashed } }
        );

        return res.json({
            status: true,
            message: "Password updated successfully !"
        });

    } catch (err) {
        return res.json({ status: false, message: err.message });
    }
};



// 🏥 Get Current Logged User
export const getCurrentUser = async (req, res) => {

    try {

        const token = req.cookies.auth_token;

        if (!token) {
            return res.json({ status: false, message: "Token not found !" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await AuthCollection.findById(decoded.id)
            .populate("user", "-__v -createdAt -updatedAt");

        return res.json({
            status: true,
            message: "Current user fetched successfully !",
            user
        });

    } catch (err) {
        return res.json({ status: false, message: err.message });
    }
};
