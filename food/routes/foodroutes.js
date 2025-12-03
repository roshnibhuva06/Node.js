import express from "express";
import { addFood, getFood, updateFood, deleteFood } from "../controllers/foodcontroller.js";

const router = express.Router();

router.post("/", addFood);
router.get("/", getFood);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

export default router;
