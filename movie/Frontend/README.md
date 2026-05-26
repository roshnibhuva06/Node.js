# 🎬 Movie Management System

<div align="center">

![Movie Banner](https://img.shields.io/badge/FullStack-Movie%20Management-red?style=for-the-badge)

![React](https://img.shields.io/badge/Frontend-React.js-blue?style=flat-square)
![Node](https://img.shields.io/badge/Backend-Node.js-green?style=flat-square)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen?style=flat-square)
![Express](https://img.shields.io/badge/Server-Express.js-lightgrey?style=flat-square)

✨ A complete **Full-Stack Movie Management Application** built with modern web technologies where users can easily **add, update, delete, search, and manage movies** along with movie poster uploads.

</div>

---

# 📌 Overview

The **Movie Management System** is a responsive full-stack CRUD application developed using:

- ⚛️ React.js (Vite)
- 🟢 Node.js
- 🚀 Express.js
- 🍃 MongoDB
- 📦 Mongoose
- 📤 Multer

This project helps admins manage movie records efficiently with poster image uploads and dynamic movie operations.

---

# ✨ Features

## 🎨 Frontend Features

- 📱 Fully Responsive UI
- 🎬 Display movie cards beautifully
- 🔍 Search movies by title
- ✏️ Edit movie details
- ❌ Delete movies with confirmation
- 🖼️ Upload and preview movie posters
- 📄 Movie details page
- ⚡ Fast loading using Vite

---

## ⚙️ Backend Features

- 🛠️ RESTful API Architecture
- 🗄️ MongoDB Database Integration
- 📤 Image Upload using Multer
- 🧹 Auto-delete old posters
- 🔐 Proper Error Handling
- 🌍 CORS Enabled
- 📁 Organized MVC Structure

---

# 🧩 Tech Stack

## 🔹 Frontend
- React.js (Vite)
- Axios
- CSS3

## 🔹 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- dotenv

---

# 📂 Folder Structure

```bash
movie/
│
├── Backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── movieController.js
│   │
│   ├── middleware/
│   │   └── upload.js
│   │
│   ├── models/
│   │   └── Movie.js
│   │
│   ├── routes/
│   │   └── movieroutes.js
│   │
│   ├── uploads/
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── Frontend/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddMovie.jsx
│   │   │   ├── EditMovie.jsx
│   │   │   ├── MovieDetails.jsx
│   │   │   └── MovieList.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# 🚀 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/movie-management-system.git
```

---

## 2️⃣ Backend Setup

```bash
cd Backend
npm install
npm start
```

---

## 3️⃣ Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

# 🛡️ Environment Variables

Create a `.env` file inside the Backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

# 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/movies` | Add new movie |
| GET | `/api/movies` | Get all movies |
| GET | `/api/movies/:id` | Get single movie |
| PUT | `/api/movies/:id` | Update movie |
| DELETE | `/api/movies/:id` | Delete movie |

---

# 📸 Poster Upload System

✅ Upload movie posters using **Multer**  
✅ Images stored inside `/uploads` folder  
✅ Old poster automatically removed on update  
✅ Poster deleted when movie is removed  

---

# 🎥 Project Demo

## 📹 Video Demo

```bash
https://drive.google.com/file/d/1K1nz2L8byCxxmCl5MD-X3PpzFinds3P0/view?usp=sharing
```

---

# 💡 Future Improvements

- 🔐 JWT Authentication
- ⭐ Movie Rating System
- 🎭 Genre Filter
- 📊 Pagination
- ❤️ Favorite Movies
- 🌐 Deployment on Render & Vercel
- 🔎 Advanced Search & Sorting

---

# 📷 Screenshots

> Add your project screenshots here

```bash
screenshots/
│
├── homepage.png
├── addmovie.png
├── moviedetails.png
└── editmovie.png
```

---



# ⭐ Support

If you like this project, give it a ⭐ on GitHub.

---

# 👩‍💻 Author

## **Roshni Bhuva**
💻 Full-Stack Developer  
🚀 Passionate about Web Development & MERN Stack

---

<div align="center">

## 🍿 “Movies touch our hearts and awaken our vision.” 🎬

Made with ❤️ by **Roshni Bhuva**

</div>
