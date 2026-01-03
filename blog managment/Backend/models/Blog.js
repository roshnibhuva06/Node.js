import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 🔥 MUST MATCH User model name
      required: true,
    },
  },
  { timestamps: true } // 🔥 VERY IMPORTANT
);

export default mongoose.model("Blog", blogSchema);
