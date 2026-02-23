# 🎬 Movie Management System

A complete **Full-Stack Movie Management Application** built using:

> Node.js • Express.js • MongoDB • Mongoose • Multer • React.js (Vite)

Easily **add, update, delete, search, and manage movies** along with poster image uploads. 🍿✨

---

## 🚀 Project Overview

This project is designed to manage movies in a structured and efficient way.

Admins can:
- Add new movies with poster upload
- Edit movie details
- Delete movies (with automatic poster removal)
- Search movies by title
- View all movies in a responsive UI

---

## 🧩 Features

### 🎨 Frontend (React + Vite)

- 📱 Fully Responsive UI
- 🖼️ Display movie posters
- 🔍 Search movies by title
- ✏️ Edit movie details
- ❌ Delete movie with confirmation
- 📄 View movie details page
- ⚡ Fast & clean design

---

### ⚙️ Backend (Node.js + Express)

- 🛠️ RESTful API architecture
- 🗄️ MongoDB + Mongoose database
- 📤 Multer for image uploads
- 🧹 Auto-delete old posters when updating/deleting
- 🛡️ Error handling & validation
- 🌍 CORS enabled

---

## 🧩 Tech Stack

### 🔹 Frontend
- React.js (Vite)
- Axios
- CSS3

### 🔹 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- dotenv

---

## 📂 Project Structure

movie/
│
├── Backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── movieController.js
│   ├── middleware/
│   │   └── upload.js
│   ├── models/
│   │   └── Movie.js
│   ├── routes/
│   │   └── movieroutes.js
│   ├── uploads/
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── Frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddMovie.jsx
│   │   │   ├── EditMovie.jsx
│   │   │   ├── MovieDetails.jsx
│   │   │   └── MovieList.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
└── README.md

---

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/movies        | Add new movie |
| GET    | /api/movies        | Get all movies |
| GET    | /api/movies/:id    | Get single movie |
| PUT    | /api/movies/:id    | Update movie |
| DELETE | /api/movies/:id    | Delete movie + poster |

---

## 📸 Movie Poster Upload

- Upload poster images using Multer
- Images stored inside `/uploads`
- Old poster automatically deleted when updating
- Poster removed when movie is deleted

---

## 🛠️ Installation Guide

### 1️⃣ Clone Repository

git clone https://github.com/your-username/movie-management-system.git  
cd movie-management-system  

---

### 2️⃣ Backend Setup

cd Backend  
npm install  

Create `.env` file inside Backend folder:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  

Start Backend Server:

npm start  

Server runs on:  
http://localhost:5000  

---

### 3️⃣ Frontend Setup

cd Frontend  
npm install  
npm run dev  

Frontend runs on:  
http://localhost:5173  

---

## 🛡️ Environment Variables

| Variable   | Description |
|------------|------------|
| PORT       | Server Port |
| MONGO_URI  | MongoDB Connection String |

---

## 💡 Future Improvements

- 🔐 Admin Authentication (JWT)
- ⭐ Movie Rating System
- 🎬 Genre Filter
- 📊 Pagination
- 🌐 Deployment (Render / Vercel)

---

## 👩‍💻 Author

**Roshni Bhuva**  
Full-Stack Developer  

---
