# 📝 Blog Management System

A *full-stack Blog Management System* built using *Node.js, Express.js, MongoDB, and React (Vite)*.  
This project allows users to *register, login, logout, and **create, view, and delete blogs* with *image upload support*.

🔐 Authentication is implemented using *secure cookie-based authentication (without JWT)*.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Loginx
- User Logout
- 🍪 Cookie-based authentication
- 🔒 Protected routes

### 📝 Blog Management
- ✍️ Create blogs
- 👀 View all blogs
- 🗑 Delete blogs
- 🖼 Image upload using *Multer*

### ⚙️ Backend Functionality
- RESTful APIs
- Password hashing with *bcryptjs*
- MongoDB database using *Mongoose*
- Secure middleware-based route protection

---

## 🛠 Tech Stack

### 🔹 Backend
- 🟢 Node.js
- ⚡ Express.js
- 🍃 MongoDB
- 🧬 Mongoose
- 📤 Multer
- 🍪 Cookie-Parser
- 🔐 bcryptjs

### 🔹 Frontend
- ⚛️ React.js
- ⚡ Vite
- 🎨 CSS

---

## 📁 Project Structure

### 📦 Backend
backend/
┣ config/
┣ controllers/
┣ middleware/
┣ models/
┣ routes/
┣ uploads/blogs/
┣ server.js
┣ package.json


### 🎨 Frontend
frontend/
┣ public/
┣ src/
┣ index.html
┣ vite.config.js
┣ package.json


---

## 📡 API Endpoints

### 🔑 Authentication Routes
| Method | Endpoint | Description |
|------|---------|------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET  | /api/auth/logout | Logout user |

### 📝 Blog Routes
| Method | Endpoint | Description |
|------|---------|------------|
| GET | /api/blogs | Get all blogs |
| POST | /api/blogs | Create blog |
| DELETE | /api/blogs/:id | Delete blog |

---

## 🔒 Security
- 🔐 Passwords encrypted using *bcryptjs*
- 🍪 HTTP-only cookies
- 🚫 Protected routes with middleware

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
git clone https://github.com/your-username/blog-management-system.git


### 2️⃣ Backend Setup
     cd backend
     npm install
     npm star


### 3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


## 📌 Project Status

✅ Cookie authentication working
✅ Protected routes secured
✅ Blog CRUD operations completed
✅ Image upload working
✅ MongoDB connected successfully

----
---
video:https://drive.google.com/file/d/1ToorxCY9wJM2y7AB_5DO_WPmNiSX5aPM/view?usp=sharing

---

## 🙌 Author

roshnibhuva06
💻 Full-Stack Developer (MERN)
🚀 Passionate about building real-world web applications

---


