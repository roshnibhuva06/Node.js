import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // 2️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Save user
    await User.create({
      name,
      email,
      password: hashedPassword
    });

    // 5️⃣ Response
    res.status(201).json({
      message: "User Registered Successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    // Cookie store
    res.cookie("userId", user._id.toString(), {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      message: "Login Successful"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// ================= LOGOUT =================
export const logout = (req, res) => {
  res.clearCookie("userId");
  res.json({
    message: "Logout Successful"
  });
};
