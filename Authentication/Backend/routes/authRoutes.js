import express from "express";
import {
  register,
  verifyOtp,
  login,
  home
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.get("/home", protect, home);

export default router;
