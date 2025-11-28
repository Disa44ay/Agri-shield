"use client";

import React, { useState } from "react";
import { useLanguage } from "@/app/LanguageContext";
import { auth } from "@/app/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2"; 

export default function Signin() {
  const { lang } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      Swal.fire({
        icon: "success",
        title: lang === "bn" ? "সফলভাবে লগইন হয়েছে!" : "Signed in successfully!",
        text: lang === "bn" ? "স্বাগতম! আপনি সফলভাবে লগইন করেছেন।" : "Welcome! You have signed in successfully.",
        confirmButtonText: "OK",
        confirmButtonColor: "#8c562e",
      }).then(() => {
        window.location.href = "/dashboard";
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: lang === "bn" ? "দুঃখিত!" : "Oops!",
        text: error.message || "Something went wrong. Please try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#8c562e",
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-center px-4" style={{  }}>
      <div className="backdrop-blur-sm bg-white/5 border border-white/30 shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md transition-transform duration-300 ease-out hover:scale-[1.03]">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white drop-shadow mb-6">
          {lang === "bn" ? "সাইন ইন" : "Sign In"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder={lang === "bn" ? "ইমেইল ঠিকানা" : "Email Address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-md bg-white/40 border border-white/40 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8c562e] placeholder-gray-700"
          />

          <input
            type="password"
            placeholder={lang === "bn" ? "পাসওয়ার্ড" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-md bg-white/40 border border-white/40 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8c562e] placeholder-gray-700"
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#8c562e] text-white rounded-md shadow-xl hover:bg-[#a66b42] transition"
          >
            {lang === "bn" ? "সাইন ইন" : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-white/80">
            {lang === "bn" ? "অ্যাকাউন্ট নেই?" : "Don't have an account?"}{" "}
            <a href="/auth/signup" className="text-[#8c562e] hover:underline">
              {lang === "bn" ? "এখানে সাইন আপ করুন" : "Sign up"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}




