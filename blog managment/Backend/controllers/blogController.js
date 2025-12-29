import Blog from "../models/Blog.js";

// CREATE BLOG
export const createBlog = async (req, res) => {
  const blog = await Blog.create({
    title: req.body.title,
    content: req.body.content,
    image: req.file ? req.file.path : null,
    author: req.user.id
  });

  res.status(201).json(blog);
};

// GET ALL BLOGS (Public)
export const getBlogs = async (req, res) => {
  const blogs = await Blog.find().populate("author", "name");
  res.json(blogs);
};

// DELETE BLOG (Only Owner)
export const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).json({ message: "Blog not found" });

  if (blog.author.toString() !== req.user.id) {
    return res.status(403).json({ message: "Access Denied" });
  }

  await blog.deleteOne();
  res.json({ message: "Blog Deleted Successfully" });
};
