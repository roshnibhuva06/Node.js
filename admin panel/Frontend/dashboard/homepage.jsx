import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/homepage.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/signin");
  };

  return (
    <div className="homepage">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>🏥 Hospital</h2>

        <ul>
          <li>Dashboard</li>
          <li>Doctors</li>
          <li>Patients</li>
          <li>Appointments</li>
          <li>Billing</li>
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">

        <h1>Hospital Dashboard</h1>

        <div className="card-container">

          <div className="card">
            <h3>Total Doctors</h3>
            <p>24</p>
          </div>

          <div className="card">
            <h3>Total Patients</h3>
            <p>180</p>
          </div>

          <div className="card">
            <h3>Appointments Today</h3>
            <p>35</p>
          </div>

          <div className="card">
            <h3>Revenue</h3>
            <p>₹45,000</p>
          </div>

        </div>
      </div>
    </div>
  );
}
