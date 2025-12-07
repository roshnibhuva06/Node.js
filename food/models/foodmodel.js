import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        name: { type: String},
        description: { type: String },
        category: { type: String },
        price: { type: Number },
        rating: { type: Number },
        calories: { type: Number },
    },
    { timestamps: true }
);

export default mongoose.model("Food", foodSchema);
