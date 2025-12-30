import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";

const app = express();

// ---------- CORS Setup ----------
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true 
}));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

connectDB();

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
