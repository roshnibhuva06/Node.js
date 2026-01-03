import express from "express";
import multer from "multer";
import auth from "../middleware/authMiddleware.js";
import {
  createBlog,
  getBlogs,
  editBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

/* ========== MULTER SETUP ========== */
const storage = multer.diskStorage({
  destination: "uploads/blogs",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ========== ROUTES ========== */

// CREATE BLOG
router.post("/", auth, upload.single("image"), createBlog);

// GET ALL BLOGS
router.get("/", getBlogs);

// UPDATE BLOG
router.put("/:id", auth, editBlog);

// DELETE BLOG
router.delete("/:id", auth, deleteBlog);

export default router;
