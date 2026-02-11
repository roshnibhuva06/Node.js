import React, { useState } from "react";
import axios from "axios";
 import { base_uri } from "../api/api.js";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const res = await axios.post(`${base_uri}/signin`, {
        email,
        password
      });

      if (res.data.status === true) {
        localStorage.setItem("email", email);

        setToast({
          show: true,
          message: res.data.message || "OTP Sent Successfully 🎉",
          type: "success"
        });

        setTimeout(() => {
          navigate("/verify-otp");
        }, 2000);
      } else {
        setToast({
          show: true,
          message: res.data.message || "Signin Failed ❌",
          type: "error"
        });
      }
    } catch (err) {
      setToast({
        show: true,
        message: "Server error ❌ Try again",
        type: "error"
      });
    }

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  return (
    <div className="signin-page">
      <div className="signin-wrapper">
        
        <div className="welcome-panel">
          <div className="logo">HC</div>

          <h1>Welcome to Hospital Management System</h1>
          <p>
            Manage patients, doctors, appointments, and hospital operations
            efficiently from one smart dashboard.
          </p>
        </div>

        <div className="form-panel">
          <h2>Hospital Sign In</h2>
          <p className="subtext">
            New here?{" "}
            <span onClick={() => navigate("/signup")}>Register Account</span>
          </p>

          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@hospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="signin-btn" onClick={handleSignin}>
            Sign In
          </button>
        </div>
      </div>

      {toast.show && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}
    </div>
  );
}
