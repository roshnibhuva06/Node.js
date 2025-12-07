import express from "express";
import {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie
} from "../controllers/movieController.js";
import { uploadSingle } from "../middleware/upload.js";

const router = express.Router();

// Add movie (multipart/form-data -> poster file + other fields)
router.post("/", (req, res, next) => {
  uploadSingle(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
}, addMovie);

// Get all movies (supports ?q=search)
router.get("/", getAllMovies);

// Get single movie
router.get("/:id", getMovieById);

// Update movie (multipart; poster optional)
router.put("/:id", (req, res, next) => {
  uploadSingle(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
}, updateMovie);

// Delete
router.delete("/:id", deleteMovie);

export default router;
