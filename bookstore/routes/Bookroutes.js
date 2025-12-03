import express from "express";
import { addFood, getFood, updateFood, deleteFood } from "../controllers/foodController.js";

const router = express.Router();

// Add Food
router.post("/", addFood);

// Get All Foods
router.get("/", getFood);

// Update Food
router.put("/:id", updateFood);

// Delete Food
router.delete("/:id", deleteFood);

export default router;
