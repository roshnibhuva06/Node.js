import express from "express";
import cors from "cors";
import tweetRoutes from "./routes/tweetRoutes.js"; // <-- routes import

const app = express();

// *********** CORS MUST BE ABOVE ALL ROUTES ***********
app.use(cors({
  origin: "http://localhost:5174",  // Vite frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Allow JSON body
app.use(express.json());

// ROUTES
app.use("/api/tweets", tweetRoutes);

// SERVER
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
