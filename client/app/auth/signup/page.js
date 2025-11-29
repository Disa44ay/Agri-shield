"use client";

import React, { useState } from "react";
import { useLanguage } from "@/app/LanguageContext";
import { auth } from "@/app/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

export default function Signup() {
  const { lang } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("/images/Male-Farmer.svg");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");

  /* Bangladesh Time */
  const getBdTime = () => {
    const now = new Date();
    const bd = new Date(now.getTime() + 6 * 60 * 60 * 1000);
    return bd.toISOString();
  };

  const createdAt = getBdTime();

  const divisions = [
    { id: "Dhaka", name: lang === "bn" ? "ঢাকা" : "Dhaka" },
    { id: "Chattogram", name: lang === "bn" ? "চট্টগ্রাম" : "Chattogram" },
    { id: "Rajshahi", name: lang === "bn" ? "রাজশাহী" : "Rajshahi" },
    { id: "Khulna", name: lang === "bn" ? "খুলনা" : "Khulna" },
    { id: "Barishal", name: lang === "bn" ? "বরিশাল" : "Barishal" },
    { id: "Sylhet", name: lang === "bn" ? "সিলেট" : "Sylhet" },
    { id: "Rangpur", name: lang === "bn" ? "রংপুর" : "Rangpur" },
    { id: "Mymensingh", name: lang === "bn" ? "ময়মনসিংহ" : "Mymensingh" },
  ];

  const districts = {
    Dhaka:
      lang === "bn"
        ? ["ঢাকা", "নারায়ণগঞ্জ", "মুন্সিগঞ্জ", "গাজীপুর", "টাঙ্গাইল"]
        : ["Dhaka", "Narayanganj", "Munshiganj", "Gazipur", "Tangail"],
    Chattogram:
      lang === "bn"
        ? ["চট্টগ্রাম", "কক্সবাজার", "ফেনী", "কুমিল্লা", "লক্ষ্মীপুর"]
        : ["Chattogram", "Cox’s Bazar", "Feni", "Cumilla", "Laxmipur"],
    Rajshahi:
      lang === "bn"
        ? ["রাজশাহী", "বগুড়া", "নওগাঁ", "পাবনা", "চাঁপাইনবাবগঞ্জ"]
        : ["Rajshahi", "Bogura", "Naogaon", "Pabna", "Chapainawabganj"],
    Khulna:
      lang === "bn"
        ? ["খুলনা", "যশোর", "সাতক্ষীরা", "বাগেরহাট", "কুষ্টিয়া"]
        : ["Khulna", "Jessore", "Satkhira", "Bagerhat", "Kushtia"],
    Barishal:
      lang === "bn"
        ? ["বরিশাল", "ভোলা", "পটুয়াখালি", "ঝালকাঠি"]
        : ["Barishal", "Bhola", "Patuakhali", "Jhalokathi"],
    Sylhet:
      lang === "bn"
        ? ["সিলেট", "মৌলভীবাজার", "হবিগঞ্জ", "সুনামগঞ্জ"]
        : ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
    Rangpur:
      lang === "bn"
        ? ["রংপুর", "দিনাজপুর", "কুড়িগ্রাম", "নীলফামারী"]
        : ["Rangpur", "Dinajpur", "Kurigram", "Nilphamari"],
    Mymensingh:
      lang === "bn"
        ? ["ময়মনসিংহ", "জামালপুর", "নেত্রকোণা"]
        : ["Mymensingh", "Jamalpur", "Netrokona"],
  };

  /* ---------------- STORE USER IN MONGODB ---------------- */
  const saveUserToMongo = async () => {
    try {
      const res = await fetch(
        "https://agri-shield-w53f.onrender.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            name,
            phone,
            division,
            district,
            picture: avatar,
            createdAt,
          }),
        }
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "MongoDB save failed");
      }

      return true;
    } catch (err) {
      console.error("MongoDB Save Error:", err);
      Swal.fire({
        icon: "error",
        title: lang === "bn" ? "ত্রুটি!" : "Error",
        text:
          lang === "bn"
            ? "ডাটাবেসে ব্যবহারকারী সংরক্ষণ ব্যর্থ হয়েছে।"
            : "Failed to save user to database.",
        confirmButtonColor: "#8c562e",
      });
      return false;
    }
  };

  /* ---------------- HANDLE SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Create Firebase Auth user
      await createUserWithEmailAndPassword(auth, email, password);

      // 2️⃣ Save user to MongoDB
      const mongoSaved = await saveUserToMongo();
      if (!mongoSaved) return;

      // 3️⃣ Success Message
      Swal.fire({
        icon: "success",
        title: lang === "bn" ? "অ্যাকাউন্ট তৈরি হয়েছে!" : "Account created!",
        text:
          lang === "bn"
            ? "আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।"
            : "Your account has been successfully created.",
        confirmButtonColor: "#8c562e",
      }).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: lang === "bn" ? "ত্রুটি!" : "Error",
        text: error.message,
        confirmButtonColor: "#8c562e",
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="backdrop-blur-sm bg-white/5 border border-white/30 shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-3xl text-center text-white font-bold">
          {lang === "bn" ? "রেজিস্টার" : "Sign Up"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={lang === "bn" ? "পুরো নাম" : "Full Name"}
            className="w-full p-3 bg-white/40 border border-white/40 rounded-md text-black"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={lang === "bn" ? "ইমেইল" : "Email"}
            className="w-full p-3 bg-white/40 border border-white/40 rounded-md text-black"
            required
          />

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={lang === "bn" ? "ফোন নম্বর" : "Phone Number"}
            className="w-full p-3 bg-white/40 border border-white/40 rounded-md text-black"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={lang === "bn" ? "পাসওয়ার্ড" : "Password"}
            className="w-full p-3 bg-white/40 border border-white/40 rounded-md text-black"
            required
          />

          {/* Division */}
          <select
            value={division}
            onChange={(e) => {
              setDivision(e.target.value);
              setDistrict("");
            }}
            className="w-full p-3 bg-white/40 border border-white/40 rounded-md text-black"
            required
          >
            <option value="">
              {lang === "bn" ? "বিভাগ নির্বাচন করুন" : "Select Division"}
            </option>
            {divisions.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* District */}
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full p-3 bg-white/40 border border-white/40 rounded-md text-black"
            required
            disabled={!division}
          >
            <option value="">
              {lang === "bn" ? "জেলা নির্বাচন করুন" : "Select District"}
            </option>
            {division &&
              districts[division].map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
          </select>

          {/* Avatar URL */}
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder={lang === "bn" ? "অবতার URL" : "Avatar URL"}
            className="w-full p-3 bg-white/40 border border-white/40 rounded-md text-black"
          />

          <button
            type="submit"
            className="w-full bg-[#8c562e] text-white p-3 rounded-md"
          >
            {lang === "bn" ? "রেজিস্টার" : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-white">
          {lang === "bn" ? "অ্যাকাউন্ট আছে?" : "Already have an account?"}
          <a href="/auth/signin" className="text-orange-300 ml-1">
            {lang === "bn" ? "লগইন করুন" : "Login"}
          </a>
        </p>
      </div>
    </div>
  );
}
