"use client";

import React, { useState } from "react";
import { useLanguage } from "@/app/LanguageContext";

export default function Signup() {
  const { lang } = useLanguage(); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", { name, email, phone, password });
    alert(lang === "bn" ? "সাইন আপ সফল হয়েছে!" : "Sign Up Successful!");
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
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white drop-shadow">
          {lang === "bn" ? "নিবন্ধন করুন" : "Sign Up"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input
            type="text"
            placeholder={lang === "bn" ? "পূর্ণ নাম" : "Full Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-md bg-white/40 border border-white/40 
            text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8c562e] placeholder-gray-700"
            required
          />

          <input
            type="email"
            placeholder={lang === "bn" ? "ইমেইল ঠিকানা" : "Email Address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-white/40 border border-white/40 
            text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8c562e] placeholder-gray-700"
            required
          />

          <input
            type="tel"
            placeholder={lang === "bn" ? "ফোন নম্বর" : "Phone Number"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded-md bg-white/40 border border-white/40 
            text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8c562e] placeholder-gray-700"
            required
          />

          <input
            type="password"
            placeholder={lang === "bn" ? "পাসওয়ার্ড" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-white/40 border border-white/40 
            text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8c562e] placeholder-gray-700"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#8c562e] text-white rounded-md shadow-xl 
            hover:bg-[#a66b42] transition"
          >
            {lang === "bn" ? "নিবন্ধন করুন" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
