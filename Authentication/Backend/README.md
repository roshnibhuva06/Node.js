# 🔐 Login System with OTP 

A secure **Login & Authentication System** built using **Node.js, Express.js, MongoDB** with **OTP-based email verification**, **JWT authentication**, and **password encryption**.

---

## 📌 Project Overview

This project implements a **complete authentication flow** including signup, email OTP verification, login, protected routes, and logout functionality with proper security practices.

---

## ✨ Key Features

✅ User Registration with Email & Password  
✅ Password Encryption using **bcrypt**  
✅ **OTP-Based Email Verification** (Nodemailer)  
✅ Secure Login with JWT Token  
✅ Protected Routes (JWT Middleware)  
✅ Logout Functionality  
✅ Proper Error Handling & Validation  
✅ Environment Variable Security (.env)  

---

## 🔄 Authentication Flow

### 1️⃣ Signup
- User registers using email & password
- Password is encrypted using bcrypt
- OTP is generated and sent to email

### 2️⃣ OTP Verification
- User enters OTP
- OTP is validated from database
- Email is marked as verified

### 3️⃣ Login
- User logs in with email & password
- Password is compared using bcrypt
- JWT token is generated

### 4️⃣ Protected Routes
- JWT token is sent in request headers
- Middleware verifies token
- Access granted only if token is valid

### 5️⃣ Logout
- Token is removed from client side

---

## 🛠️ Tech Stack

### Backend
- **Node.js**
- **Express.js**

### Database
- **MongoDB**
- **Mongoose**

### Authentication & Security
- **JWT (JSON Web Token)**
- **bcrypt**
- **OTP Verification**

### Email Service
- **Nodemailer (Gmail SMTP)**

### Tools
- **dotenv**
- **Postman**





