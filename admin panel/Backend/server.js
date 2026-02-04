import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import auth_routes from "./routes/auth_routes.js";
import admin_routes from "./routes/admin_routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true
}));


app.use("/api/auth", auth_routes);
app.use("/api/admin", admin_routes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Hospital Server Running on Port ${PORT}`);
});




//otp
