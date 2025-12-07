import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import moviesRouter from "./routes/movieroutes.js";

// ENV variables
const PORT = process.env.PORT || 5000;
const IMAGE_PATH = process.env.IMAGE_PATH || "uploads";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Serve uploads folder (image access from frontend)
app.use(`/${IMAGE_PATH}`, express.static(path.resolve(IMAGE_PATH)));

// API Routes
app.use("/api/movies", moviesRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
