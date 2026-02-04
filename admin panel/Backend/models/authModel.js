import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: [
            "Admin",
            "Doctor",
            "Nurse",
            "Receptionist",
            "LabStaff",
            "Pharmacist"
        ],
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }

}, { timestamps: true });

export const AuthCollection = mongoose.model("auth", authSchema);


