<h1>🎬 Movie Management System</h1>
A complete Full-Stack Movie Management Application built with Express.js, MongoDB, Mongoose, Multer, and a responsive Frontend UI.
Easily add, update, delete, search, and display movies along with poster images! 🍿✨

🚀 Project Overview

This project is designed to manage movies in a structured and efficient way.
Admins can add movies with poster upload, store them in a database, and manage them through a clean user interface.

🧩 Features
🔥 Frontend

🎨 Responsive UI (HTML + CSS + JavaScript)

🖼️ Display movie posters

🔍 Search movies by title

✏️ Edit movie details

❌ Delete movie with confirmation

📱 Mobile-friendly layout

⚙️ Backend

🛠️ Built using Node.js + Express.js

🗄️ MongoDB + Mongoose for database

📤 Multer for uploading movie poster images

🔗 REST APIs for CRUD operations

🧹 Auto-delete old posters when updating/deleting movies

🛡️ Error handling and validation

📸 Movie Poster Upload

Upload and store movie posters easily with Multer.
Files are saved in /uploads and automatically deleted when needed. 🗑️✨

```markdown
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
│   ├── node_modules/
│   ├── server.js                     
│   ├── .env                          
│   ├── package.json
│   └── package-lock.json
│
│
├── Frontend/                         🎨 Frontend (React + Vite)
│   ├── public/
│   │   └── index.html                🏠 Main HTML file
│   │
│   ├── src/
│   │   ├── components/               🧩 Reusable Components
│   │   │   ├── AddMovie.jsx
│   │   │   ├── EditMovie.jsx
│   │   │   ├── MovieDetails.jsx
│   │   │   └── MovieList.jsx
│   │   │
│   │   ├── App.jsx                   
│   │   ├── App.css                   🎨 Global Styles
│   │   └── main.jsx                  
│   │
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js               
│
└── README.md                         

```

📝 API Endpoints

➕ POST /api/movies — Add new movie

📥 GET /api/movies — Get all movies

🔎 GET /api/movies/:id — Get single movie

✏️ PUT /api/movies/:id — Update movie

❌ DELETE /api/movies/:id — Delete movie + poster

video:https://drive.google.com/file/d/1m4MiZZCqsLYsxv0mRo9ihsBYSarClzbc/view?usp=sharing
