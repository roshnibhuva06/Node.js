import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },     // Food ka naam
        description: { type: String },              // Short details
        category: { type: String },                 // Example: Fast Food, Indian, Dessert
        price: { type: Number, required: true },    // Price
        calories: { type: Number },                 // (optional)
        isVeg: { type: Boolean, default: true },    // Veg/Non-Veg
    },
    { timestamps: true }
);

export default mongoose.model("Food", foodSchema);
