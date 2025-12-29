const authMiddleware = (req, res, next) => {
  const userId = req.cookies.userId;

  if (!userId) {
    return res.status(401).json({ message: "Please login first" });
  }
   req.user = { id: userId };
  next();
};

export default authMiddleware;
