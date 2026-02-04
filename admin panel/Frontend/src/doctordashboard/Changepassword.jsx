import React, { useState } from "react";

const ChangePassword = () => {

  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      alert(data.message);

    } catch (err) {
      alert("Password Change Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-50">

      <form onSubmit={handleChangePassword} className="bg-white p-8 rounded-xl shadow-lg w-80">

        <h2 className="text-2xl font-bold text-center text-green-600 mb-5">
          Change Password
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          className="w-full p-2 border rounded mb-4"
          onChange={handleChange}
          required
        />

        <button className="w-full bg-green-600 text-white p-2 rounded">
          Update Password
        </button>

      </form>

    </div>
  );
};

export default ChangePassword;
