import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String },
    genre: { type: String },
    releaseYear: { type: Number },
    poster: { type: String } // store filename or relative path e.g. 'uploads/abc.jpg'
  },
  { timestamps: true }
);

// Add text index to title for search (optional; we will use regex search)
movieSchema.index({ title: "text" });

export default mongoose.model("Movie", movieSchema);
