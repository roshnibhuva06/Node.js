import Blog from "../models/Blog.js";

/* ================= CREATE BLOG ================= */
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and Content are required" });
    }

    const blog = await Blog.create({
      title,
      content,
      image: req.file ? req.file.path : null,
      author: req.user.id, // 🔐 must come from auth middleware
    });

    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating blog" });
  }
};

/* ================= GET ALL BLOGS (PUBLIC) ================= */
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(blogs); // ✅ ALWAYS array
  } catch (err) {
    console.error(err);
    res.status(200).json([]); // ✅ frontend crash safe
  }
};

/* ================= EDIT BLOG (ONLY OWNER) ================= */
export const editBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // 🔒 OWNER CHECK
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access Denied" });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;

    if (req.file) {
      blog.image = req.file.path;
    }

    await blog.save();

    res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating blog" });
  }
};

/* ================= DELETE BLOG (ONLY OWNER) ================= */
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access Denied" });
    }

    await blog.deleteOne();

    res.status(200).json({ message: "Blog Deleted Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting blog" });
  }
};
