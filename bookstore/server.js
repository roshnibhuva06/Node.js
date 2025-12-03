import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import logger from "./middleware/logger.js";
import foodRoutes from "./routes/foodRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

// DB connect
connectDB();

// Food Routes
app.use("/api/foods", foodRoutes);

app.listen(3200, () => {
    console.log("Server started Running...!");
});
