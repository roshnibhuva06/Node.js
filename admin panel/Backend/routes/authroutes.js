import express from "express";

import {
  signup,
  signin,
  signout,
  verifyOTP,
  changePassword,
  forgetPassword,
  verifyOtpForCreatePassword,
  getCurrentUser
} from "../controllers/authControllers.js";

import {
  validateSignupFields,
  validateSigninFields,
  validateOtpFields
} from "../Middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/signup", validateSignupFields, signup);
router.post("/signin", validateSigninFields, signin);
router.post("/verify-otp", validateOtpFields, verifyOTP);
router.post("/change-password", changePassword);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", verifyOtpForCreatePassword);
router.get("/current-user", getCurrentUser);
router.post("/signout", signout);

export default router;
