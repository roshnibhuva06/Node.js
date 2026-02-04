import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  const logout = () => {
    navigate("/signin");
  };

  return (
    <div className="container mt-5 text-center">
      <h2>🏥 Hospital Admin Panel</h2>
      <p>Welcome to Dashboard</p>

      <button onClick={logout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
}
