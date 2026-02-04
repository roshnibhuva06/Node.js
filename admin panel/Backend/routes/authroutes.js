import express from "express";

import {
  changePassword,
  forgetPassword,
  getCurrentUser,
  signin,
  signout,
  signup,
  verifyOTP,
  verifyOtpForCreatePassword
} from "../controllers/auth_controller.js";

import {
  validateSigninFields,
  validateOtpFields,
  validateSignupFields
} from "../middlewares/auth_middleware.js";

const auth_routes = express.Router();
auth_routes.post("/signup", validateSignupFields, signup);
auth_routes.post("/signin", validateSigninFields, signin);
auth_routes.post("/signout", signout);
auth_routes.post("/verify-otp", validateOtpFields, verifyOTP);
auth_routes.post("/change-password", changePassword);
auth_routes.post("/forget-password", forgetPassword);

auth_routes.post("/verify-forget-password", verifyOtpForCreatePassword);
auth_routes.get("/get-current-user", getCurrentUser);

export default auth_routes;
