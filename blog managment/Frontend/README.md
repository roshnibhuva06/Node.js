<h1>📝 Blog Management System</h1>
Blog Management System ek web-based backend + frontend project hai jisme users register, login, logout kar sakte hain aur blogs create, view, delete kar sakte hain.🍪 Cookie-Based Authentication | 🖼 Image Upload | 🛠 Node.js + MongoDB

🔐 Authentication JWT ke bina, pure cookie-based hai.
🖼 Blog ke sath image upload support hai (Multer use karke).
📦 Saara data MongoDB me securely store hota hai.

🎯 Project Objectives

🍪 Cookie-based authentication implement karna

🔐 Secure login & logout functionality

📝 Blog CRUD operations

🖼 Image upload using Multer

🧩 RESTful APIs banana

🔒 Protected routes ko secure karna

⚙️ Tech Stack Used
Backend

🟢 Node.js ⚡ Express.js 🍃 MongoDB  🧬 Mongoose  📤 Multer  🍪 Cookie-Parser  🔐 bcryptjs

📡 API Endpoints
🔑 Auth Routes
```markdown
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/auth/logout	Logout user

```
📝 Blog Routes

```markdown
Method	Endpoint	Description
GET	/api/blogs	Get all blogs
POST	/api/blogs	Create blog
DELETE	/api/blogs/:id	Delete blog
```
📌 Project Completion Status

✅ Cookie authentication working
✅ Protected routes secured
✅ Blog CRUD working
✅ Image upload successful
✅ MongoDB connected & storing data
