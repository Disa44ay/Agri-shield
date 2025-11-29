"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import Image from "next/image";
import { auth } from "@/app/firebase";
import { useFirebaseUser } from "@/app/useFirebaseUser";
import { useQuery } from "@tanstack/react-query";
import { getFarmersData } from "@/api/farmersDataApi";
import emailjs from "@emailjs/browser";

// Simple toast component
const Toast = ({ children, onClose }) => {
  return (
    <div className="fixed top-20 right-5 z-50 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-black/70 text-white p-4 rounded-xl shadow-lg backdrop-blur-md">
      <button
        className="absolute top-1 right-2 text-white text-lg font-bold"
        onClick={onClose}
      >
        ×
      </button>
      {children}
    </div>
  );
};

export default function Navbar() {
  const { lang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [cropFeedback, setCropFeedback] = useState([]);

  // Firebase auth user
  const { user, loading } = useFirebaseUser();

  // Fetch MongoDB user list
  const farmersQuery = useQuery({
    queryKey: ["farmers"],
    queryFn: getFarmersData,
  });

  // Match logged-in user from MongoDB
  const mongoUser =
    farmersQuery.data?.find(
      (f) => f.email === user?.email?.trim().toLowerCase()
    ) || null;

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ---------------- TEXT (BN + EN) ----------------
  const text = {
    en: {
      weather: "Weather",
      farmers: "Farmers",
      registerCrop: "Register Crop",
      notification: "Notification",
      login: "Login",
      dashboard: "Dashboard",
      logout: "Logout",
    },
    bn: {
      weather: "আবহাওয়া",
      farmers: "কৃষক তালিকা",
      registerCrop: "ফসল নিবন্ধন",
      notification: "নোটিফিকেশন",
      login: "লগইন",
      dashboard: "ড্যাশবোর্ড",
      logout: "লগআউট",
    },
  };

  const t = text[lang];

  // Fetch Crop Risk Feedback for toast
  const fetchCropFeedback = async () => {
    if (!user?.email) return;

    try {
      const res = await fetch(
        "https://agri-shield-w53f.onrender.com/api/crops"
      );
      const data = await res.json();
      const cropsList = data?.crops || data;
      const userCrops = cropsList.filter(
        (c) => c.userEmail.toLowerCase() === user?.email?.toLowerCase()
      );

      // Simple logic for crop feedback based on temperature & rain chance
      const feedback = userCrops.map((crop) => {
        const temp = 30;
        const rainChance = 50;
        let riskStatus = "good";

        if (crop.cropType.includes("grain") && (temp > 35 || rainChance > 80))
          riskStatus = "bad";
        else if (
          crop.cropType.includes("vegetable") &&
          (temp < 15 || temp > 35 || rainChance > 70)
        )
          riskStatus = "bad";
        else if (
          crop.cropType.includes("fruit") &&
          (temp < 20 || temp > 35 || rainChance > 60)
        )
          riskStatus = "bad";

        return lang === "bn"
          ? riskStatus === "good"
            ? `<p class="text-green-400 font-semibold">${crop.cropName} এর জন্য আবহাওয়া ভালো আছে।</p>`
            : `<p class="text-red-400 font-semibold">${crop.cropName} এর জন্য আবহাওয়া অনুকূল নয়, সতর্ক থাকুন।</p>`
          : riskStatus === "good"
          ? `<p class="text-green-400 font-semibold">Weather is good for ${crop.cropName}.</p>`
          : `<p class="text-red-400 font-semibold">Weather is not favorable for ${crop.cropName}, stay alert.</p>`;
      });

      setCropFeedback(feedback);
      setShowToast(true);

      // ---------------- SEND EMAIL VIA EMAILJS ----------------
      const messageContent = feedback
        .map((fb) => fb.replace(/<[^>]+>/g, ""))
        .join("\n");

      await emailjs.send(
        "service_2gu42c7",
        "template_lm88rms",
        {
          name: mongoUser?.name || "Farmer",
          time: new Date().toLocaleString(),
          message: messageContent,
          to_email: user.email,
        },
        "Gt8sMkrzyk0go93fx"
      );

      console.log("Notification email sent successfully!");
    } catch (err) {
      console.log("Crop feedback fetch or email error:", err);
    }
  };

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 border-b
      ${
        scrolled
          ? "bg-[#F7EEDC]/70 backdrop-blur-md border-[#E2C9A6]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 py-3">
        {/* LOGO */}
        <Link
          href="/"
          className={`text-2xl sm:text-3xl font-extrabold tracking-tight transition-all ${
            scrolled ? "text-[#5A381F]" : "text-white"
          }`}
        >
          Agri<span className="text-[#A66A3A]">Shield</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-6 lg:gap-8">
          <Link
            href="/weather"
            className={`font-medium transition-all ${
              scrolled ? "text-[#5A381F]" : "text-white"
            } hover:text-[#A66A3A]`}
          >
            {t.weather}
          </Link>

          <Link
            href="/farmers"
            className={`font-medium transition-all ${
              scrolled ? "text-[#5A381F]" : "text-white"
            } hover:text-[#A66A3A]`}
          >
            {t.farmers}
          </Link>

          <Link
            href="/crops/register"
            className={`font-medium transition-all ${
              scrolled ? "text-[#5A381F]" : "text-white"
            } hover:text-[#A66A3A"}`}
          >
            {t.registerCrop}
          </Link>

          <button
            onClick={fetchCropFeedback}
            className={`font-medium transition-all ${
              scrolled ? "text-[#5A381F]" : "text-white"
            } hover:text-[#A66A3A]`}
          >
            {t.notification}
          </button>

          <LanguageToggle />

          {!user ? (
            <Link
              href="/auth/signin"
              className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all shadow-sm ${
                scrolled
                  ? "bg-[#A66A3A] text-white hover:bg-[#8c562e]"
                  : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
              }`}
            >
              {t.login}
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="rounded-full overflow-hidden"
              >
                <Image
                  src={mongoUser?.avatar || "/images/Male-Farmer.svg"}
                  alt="User"
                  width={42}
                  height={42}
                  className="rounded-full border border-white/30 cursor-pointer"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-40 bg-white text-black rounded-xl shadow-lg border p-2">
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium"
                  >
                    {t.dashboard}
                  </Link>

                  <button
                    onClick={() => auth.signOut()}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium"
                  >
                    {t.logout}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden text-2xl sm:text-3xl transition-all ${
            scrolled ? "text-[#5A381F]" : "text-white"
          }`}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className={`lg:hidden px-4 sm:px-6 md:px-8 pb-5 flex flex-col gap-3 sm:gap-4 border-t backdrop-blur-md transition-all ${
            scrolled
              ? "bg-[#F7EEDC]/95 border-[#E2C9A6]"
              : "bg-black/40 border-white/10"
          }`}
        >
          <Link
            href="/weather"
            className={`w-full text-left py-2 font-medium ${
              scrolled ? "text-[#5A381F]" : "text-white"
            }`}
          >
            {t.weather}
          </Link>

          <Link
            href="/farmers"
            className={`w-full text-left py-2 font-medium ${
              scrolled ? "text-[#5A381F]" : "text-white"
            }`}
          >
            {t.farmers}
          </Link>

          <Link
            href="/crops/register"
            className={`w-full text-left py-2 font-medium ${
              scrolled ? "text-[#5A381F]" : "text-white"
            }`}
          >
            {t.registerCrop}
          </Link>

          <button
            onClick={fetchCropFeedback}
            className={`w-full text-left py-2 font-medium ${
              scrolled ? "text-[#5A381F]" : "text-white"
            }`}
          >
            {t.notification}
          </button>

          <LanguageToggle />

          {!user ? (
            <Link
              href="/auth/signin"
              className={`w-full px-4 py-2 rounded-lg ${
                scrolled
                  ? "bg-[#A66A3A] text-white"
                  : "bg-white/20 text-white backdrop-blur-sm"
              }`}
            >
              {t.login}
            </Link>
          ) : (
            <div className="flex items-center gap-3 mt-4">
              <Image
                src={mongoUser?.avatar || "/images/Male-Farmer.svg"}
                alt="User"
                width={40}
                height={40}
                className="rounded-full border border-white/30"
              />

              <Link
                href="/dashboard"
                className="text-white font-medium hover:text-[#A66A3A]"
              >
                {t.dashboard}
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Toast for Crop Risk Feedback */}
      {showToast && (
        <Toast onClose={() => setShowToast(false)}>
          {cropFeedback.map((fb, i) => (
            <div
              key={i}
              dangerouslySetInnerHTML={{ __html: fb }}
              className="mb-2 text-sm sm:text-base"
            />
          ))}
        </Toast>
      )}
    </nav>
  );
}
