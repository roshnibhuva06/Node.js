import Food from "../models/foodModel.js";

// Add Food
export const addFood = async (req, res) => {
    try {
        const newFood = await Food.create(req.body);
        res.status(201).json({
            message: "Food Added Successfully",
            food: newFood,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get Food
export const getFood = async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json({ foods });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update Food
export const updateFood = async (req, res) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Food Updated Successfully",
            food: updatedFood,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete FOOD
export const deleteFood = async (req, res) => {
    try {
        await Food.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Food Deleted Successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
