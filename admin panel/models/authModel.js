import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile",
    },
  },
  { timestamps: true },
);

export default mongoose.model("auth", authSchema);