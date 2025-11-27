"use client";

import React, { useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signin logic here
    console.log("Signin Form submitted", { email, password });
  };

  return (
    <div className="signin-form-container mx-auto max-w-lg p-8 bg-white bg-opacity-70 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c562e] shadow-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8c562e] shadow-md"
        />
        <button
          type="submit"
          className="w-full py-3 bg-[#8c562e] text-white rounded-md hover:bg-[#a66b42] transition duration-300 shadow-xl"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
