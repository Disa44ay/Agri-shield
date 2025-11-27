"use client";

import React, { useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signin Form submitted", { email, password });
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/your-background.jpg')" }}
    >
      <div
        className="backdrop-blur-sm bg-white/5 border border-white/30 
        shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md
        transition-transform duration-300 ease-out
        hover:scale-[1.03]"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white drop-shadow mb-6">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-md bg-white/40 border border-white/40 
            text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8c562e] placeholder-gray-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-md bg-white/40 border border-white/40 
            text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8c562e] placeholder-gray-700"
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#8c562e] text-white rounded-md shadow-xl 
            hover:bg-[#a66b42] transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
