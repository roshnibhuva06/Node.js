import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000/api";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  // ================= GET ALL BLOGS =================
  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API}/blogs`);
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ================= DELETE BLOG =================
  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure to delete this blog?")) return;

    try {
      const res = await fetch(`${API}/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      alert(data.message);
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  // ================= EDIT BLOG =================
  const startEdit = (blog) => {
    setEditingBlog(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
  };

  const updateBlog = async () => {
    try {
      const res = await fetch(`${API}/blogs/${editingBlog}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();
      alert(data.message);
      setEditingBlog(null);
      setTitle("");
      setContent("");
      fetchBlogs();
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h2>📝 Blog Management System</h2>
        <div className="nav-links">
          <a href="/src/html/login.html">Login</a>
          <a href="/src/html/register.html">Register</a>
          <a href="/src/html/create-blog.html">Create Blog</a>
        </div>
      </nav>

      <div className="blogs-container">
        {blogs.length === 0 ? (
          <p>No blogs available.</p>
        ) : (
          blogs.map((blog) => (
            <div className="blog-card" key={blog._id}>
              {editingBlog === blog._id ? (
                <>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Blog Title"
                  />
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Blog Content"
                  />
                  <button onClick={updateBlog}>Save ✅</button>
                  <button onClick={() => setEditingBlog(null)}>Cancel ❌</button>
                </>
              ) : (
                <>
                  <h3>{blog.title}</h3>
                  <p>{blog.content}</p>
                  {blog.image && (
                    <img
                      src={`http://localhost:5000/${blog.image}`}
                      alt="Blog"
                      width="200"
                    />
                  )}
                  {token && (
                    <div className="blog-actions">
                      <button onClick={() => startEdit(blog)}>Edit ✏️</button>
                      <button onClick={() => deleteBlog(blog._id)}>Delete 🗑️</button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
