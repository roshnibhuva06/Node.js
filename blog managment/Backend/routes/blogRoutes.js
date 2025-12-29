import express from "express";
import multer from "multer";
import auth from "../middleware/authMiddleware.js";
import { createBlog, getBlogs, deleteBlog } from "../controllers/blogController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/blogs",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/", auth, upload.single("image"), createBlog);
router.get("/", getBlogs);
router.delete("/:id", auth, deleteBlog);

export default router;
