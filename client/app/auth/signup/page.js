"use client";

import React, { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Form submitted", { name, email, phone, password });
  };

  return (
    <div className="signup-form-container mx-auto max-w-lg p-8 bg-white bg-opacity-70 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-700">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
