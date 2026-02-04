import React, { useState } from "react";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      alert(data.message);

    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-red-50">

      <form onSubmit={handleForgot} className="bg-white p-8 rounded-xl shadow-lg w-80">

        <h2 className="text-2xl font-bold text-center text-red-600 mb-5">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-2 border rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="w-full bg-red-600 text-white p-2 rounded">
          Send OTP
        </button>

      </form>

    </div>
  );
};

export default ForgotPassword;
