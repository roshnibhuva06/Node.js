import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true }, 
        description: { type: String, required: true },
        category: { type: String }, 
        price: { type: Number, required: true },
        rating: { type: Number, min: 1, max: 5 },
        calories: { type: Number },
    },
    { timestamps: true }
);

export default mongoose.model("Food", foodSchema);
