"use client";

import React, { useState } from "react";
import { useLanguage } from "@/app/LanguageContext";
import { auth } from "@/app/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function Signup() {
  const { lang } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("/images/Male-Farmer.svg"); // Default avatar
  const [division, setDivision] = useState(""); // Division
  const [district, setDistrict] = useState(""); // District

    const divisions = [
    { id: "dhaka", name: lang === "bn" ? "ঢাকা" : "Dhaka" },
    { id: "chattogram", name: lang === "bn" ? "চট্টগ্রাম" : "Chattogram" },
    { id: "rajshahi", name: lang === "bn" ? "রাজশাহী" : "Rajshahi" },
    { id: "khulna", name: lang === "bn" ? "খুলনা" : "Khulna" },
    { id: "barishal", name: lang === "bn" ? "বরিশাল" : "Barishal" },
    { id: "sylhet", name: lang === "bn" ? "সিলেট" : "Sylhet" },
    { id: "rangpur", name: lang === "bn" ? "রংপুর" : "Rangpur" },
    { id: "mymensingh", name: lang === "bn" ? "ময়মনসিংহ" : "Mymensingh" },
  ];

  const districts = {
    dhaka: [
      lang === "bn" ? "ঢাকা সিটি" : "Dhaka City",
      lang === "bn" ? "নারায়ণগঞ্জ" : "Narayanganj",
      lang === "bn" ? "মুন্সিগঞ্জ" : "Munshiganj",
      lang === "bn" ? "গাজীপুর" : "Gazipur",
      lang === "bn" ? "টাঙ্গাইল" : "Tangail"
    ],
    chattogram: [
      lang === "bn" ? "চট্টগ্রাম সিটি" : "Chattogram City",
      lang === "bn" ? "কক্সবাজার" : "Cox's Bazar",
      lang === "bn" ? "ফেনী" : "Feni",
      lang === "bn" ? "কুমিল্লা" : "Comilla",
      lang === "bn" ? "লক্ষ্মীপুর" : "Lakshmipur"
    ],
    rajshahi: [
      lang === "bn" ? "রাজশাহী সিটি" : "Rajshahi City",
      lang === "bn" ? "বগুড়া" : "Bogura",
      lang === "bn" ? "নওগাঁ" : "Naogaon",
      lang === "bn" ? "পাবনা" : "Pabna",
      lang === "bn" ? "চাঁপাইনবাবগঞ্জ" : "Chapainawabganj"
    ],
    khulna: [
      lang === "bn" ? "খুলনা সিটি" : "Khulna City",
      lang === "bn" ? "যশোর" : "Jessore",
      lang === "bn" ? "সাতক্ষীরা" : "Satkhira",
      lang === "bn" ? "বাগেরহাট" : "Bagerhat",
      lang === "bn" ? "কুষ্টিয়া" : "Kushtia"
    ],
    barishal: [
      lang === "bn" ? "বরিশাল সিটি" : "Barishal City",
      lang === "bn" ? "ভোলা" : "Bhola",
      lang === "bn" ? "পটুয়াখালী" : "Patuakhali",
      lang === "bn" ? "ঝালকাঠি" : "Jhalokathi"
    ],
    sylhet: [
      lang === "bn" ? "সিলেট সিটি" : "Sylhet City",
      lang === "bn" ? "মৌলভীবাজার" : "Moulvibazar",
      lang === "bn" ? "হবিগঞ্জ" : "Habiganj",
      lang === "bn" ? "সুনামগঞ্জ" : "Sunamganj"
    ],
    rangpur: [
      lang === "bn" ? "রংপুর সিটি" : "Rangpur City",
      lang === "bn" ? "দিনাজপুর" : "Dinajpur",
      lang === "bn" ? "কুড়িগ্রাম" : "Kurigram",
      lang === "bn" ? "নীলফামারী" : "Nilphamari"
    ],
    mymensingh: [
      lang === "bn" ? "ময়মনসিংহ সিটি" : "Mymensingh City",
      lang === "bn" ? "জামালপুর" : "Jamalpur",
      lang === "bn" ? "নেত্রকোণা" : "Netrokona"
    ],
  };

  const getBdTime = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const bdTime = new Date(utc + 6 * 3600000); // UTC+6
    const day = String(bdTime.getDate()).padStart(2, "0");
    const month = String(bdTime.getMonth() + 1).padStart(2, "0");
    const year = bdTime.getFullYear();
    const hours = String(bdTime.getHours()).padStart(2, "0");
    const minutes = String(bdTime.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  const [createdAt, setCreatedAt] = useState(getBdTime()); // Store createdAt with Bangladesh time

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value); // Set the avatar from the URL input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      Swal.fire({
        icon: "success",
        title: lang === "bn" ? "অ্যাকাউন্ট তৈরি হয়েছে!" : "Account created successfully!",
        text: lang === "bn" ? "অভিনন্দন! আপনার অ্যাকাউন্ট তৈরি হয়েছে।" : "Congratulations! Your account has been created.",
        confirmButtonText: "OK",
        confirmButtonColor: "#8c562e",
      }).then(() => {
        window.location.href = "/"; // Redirect to landing page after clicking OK
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
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white drop-shadow">
          {lang === "bn" ? "রেজিস্টার" : "Sign Up"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input
            type="text"
            placeholder={lang === "bn" ? "পুরো নাম" : "Full Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-md bg-white/40 border border-white/40 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8c562e] placeholder-gray-700"
            required
          />

          <input
            type="email"
            placeholder={lang === "bn" ? "ইমেইল ঠিকানা" : "Email Address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-white/40 border border-white/40 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8c562e] placeholder-gray-700"
            required
          />

          <input
            type="tel"
            placeholder={lang === "bn" ? "ফোন নম্বর" : "Phone Number"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded-md bg-white/40 border border-white/40 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8c562e] placeholder-gray-700"
            required
          />

          <input
            type="password"
            placeholder={lang === "bn" ? "পাসওয়ার্ড" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-white/40 border border-white/40 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8c562e] placeholder-gray-700"
            required
          />

          {/* Division dropdown */}
          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="w-full p-3 rounded-md bg-white/40 border border-white/40 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8c562e]"
            required
          >
            <option value="">{lang === "bn" ? "বিভাগ নির্বাচন করুন" : "Select Division"}</option>
            {divisions.map((div) => (
              <option key={div.id} value={div.id}>
                {div.name}
              </option>
            ))}
          </select>

          {/* District dropdown */}
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full p-3 rounded-md bg-white/40 border border-white/40 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8c562e]"
            required
            disabled={!division}
          >
            <option value="">{lang === "bn" ? "জেলা নির্বাচন করুন" : "Select District"}</option>
            {division &&
              districts[division].map((dist, index) => (
                <option key={index} value={dist}>
                  {dist}
                </option>
              ))}
          </select>

          {/* Avatar URL input */}
          <div className="w-full">
            <label htmlFor="avatar" className="block text-[#ffffffe1]">{lang === "bn" ? "অ্যাভাটার URL দিন" : "Enter Avatar URL"}</label>
            <input
              type="text"
              value={avatar}
              onChange={handleAvatarChange}
              placeholder={lang === "bn" ? "অ্যাভাটার URL" : "Avatar URL"}
              className="w-full p-3 border border-white/40 text-[#ffffffe1] focus:outline-none focus:ring-2 focus:ring-[#8c562e] mt-2"
            />
            <div className="mt-2 flex justify-center">
              <img src={avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#8c562e] text-white rounded-md shadow-xl hover:bg-[#a66b42] transition"
          >
            {lang === "bn" ? "রেজিস্টার" : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-white/80">
            {lang === "bn" ? "আপনার অ্যাকাউন্ট আছে?" : "Already have an account?"}{" "}
            <a href="/auth/signin" className="text-[#ed9e61] hover:underline">
              {lang === "bn" ? "এখানে লগ ইন করুন" : "Login here"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
