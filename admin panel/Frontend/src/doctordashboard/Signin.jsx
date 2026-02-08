import React, { useState } from "react";

const Signin = () => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      alert(data.message);

    } catch (err) {
      alert("Signin Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-50">

      <form onSubmit={handleSignin} className="bg-white p-8 rounded-xl shadow-lg w-80">

        <h2 className="text-2xl font-bold text-center mb-5 text-green-600">
          Hospital Signin
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
          type="password"
          name="password"
          placeholder="Enter Password"
          className="w-full p-2 border rounded mb-4"
          onChange={handleChange}
          required
        />

        <button
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Signin
        </button>

      </form>

    </div>
  );
};

export default Signin;


