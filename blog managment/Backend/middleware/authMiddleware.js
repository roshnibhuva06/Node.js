import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const userId = req.cookies.userId;

    if (!userId) {
      return res.status(401).json({ message: "Please login first" });
    }

    // 🔍 Check user exists
    const user = await User.findById(userId).select("_id");

    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    req.user = { id: user._id };
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Authentication failed" });
  }
};

export default authMiddleware;
