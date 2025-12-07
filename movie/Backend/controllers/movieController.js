import Movie from "../models/Movie.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const uploadDir = process.env.UPLOAD_DIR || "uploads";

export const addMovie = async (req, res) => {
  try {
    // multer already wrote file — filename at req.file.filename
    const { title, description, genre, releaseYear } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const posterPath = req.file ? path.join(uploadDir, req.file.filename) : null;

    const movie = await Movie.create({
      title,
      description,
      genre,
      releaseYear: releaseYear ? Number(releaseYear) : undefined,
      poster: posterPath // store relative path
    });

    return res.status(201).json({ message: "Movie added", movie });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const getAllMovies = async (req, res) => {
  try {
    // support search via ?q=...
    const q = req.query.q;
    let filter = {};
    if (q) {
      // case-insensitive partial match on title
      filter.title = { $regex: q, $options: "i" };
    }
    const movies = await Movie.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ movies });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    return res.status(200).json({ movie });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const { title, description, genre, releaseYear } = req.body;

    // If a new poster was uploaded, delete old file
    if (req.file) {
      if (movie.poster) {
        const oldPath = path.resolve(movie.poster);
        // try to delete if exists
        fs.unlink(oldPath, (err) => {
          if (err) console.warn("Failed to delete old poster:", err.message);
        });
      }
      movie.poster = path.join(uploadDir, req.file.filename);
    }

    if (title) movie.title = title;
    if (description !== undefined) movie.description = description;
    if (genre !== undefined) movie.genre = genre;
    if (releaseYear !== undefined) movie.releaseYear = releaseYear ? Number(releaseYear) : undefined;

    await movie.save();
    return res.status(200).json({ message: "Movie updated", movie });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    // Find the movie by ID
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Delete poster file if it exists
    if (movie.poster) {
      const filePath = path.resolve(movie.poster);
      try {
        await fs.promises.unlink(filePath);
        console.log("Poster file deleted:", filePath);
      } catch (err) {
        console.warn("Failed to delete poster file:", err.message);
      }
    }

    // Delete movie from database
    await movie.deleteOne(); // safer than remove()
    return res.status(200).json({ message: "Movie deleted successfully" });

  } catch (err) {
    console.error("Delete movie error:", err);
    return res.status(500).json({ message: err.message });
  }
};
