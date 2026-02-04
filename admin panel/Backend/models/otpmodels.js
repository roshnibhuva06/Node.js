import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({

    otp: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    purpose: {
        type: String,
        enum: [
            "LOGIN",
            "FORGOT_PASSWORD",
            "STAFF_VERIFICATION"
        ],
        required: true
    },

    expiryAt: {
        type: Date,
        required: true
    }

}, { timestamps: true });

export const OtpCollection = mongoose.model("otp", otpSchema);
