"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import Image from "next/image";
import { auth } from "@/app/firebase";
import { useFirebaseUser } from "@/app/useFirebaseUser";

export default function Navbar() {
  const { lang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🔥 REAL AUTH DATA
  const { user, loading } = useFirebaseUser();
  console.log(user)

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
      login: "Login",
      dashboard: "Dashboard",
      logout: "Logout",
    },
    bn: {
      weather: "আবহাওয়া",
      farmers: "কৃষক তালিকা",
      registerCrop: "ফসল নিবন্ধন",
      login: "লগইন",
      dashboard: "ড্যাশবোর্ড",
      logout: "লগআউট",
    },
  };

  const t = text[lang];

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 border-b
      ${
        scrolled
          ? "bg-[#F7EEDC]/70 backdrop-blur-md border-[#E2C9A6]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* ---------------- LOGO ---------------- */}
        <Link
          href="/"
          className={`text-3xl font-extrabold tracking-tight transition-all ${
            scrolled ? "text-[#5A381F]" : "text-white"
          }`}
        >
          Agri<span className="text-[#A66A3A]">Shield</span>
        </Link>

        {/* ---------------- DESKTOP MENU ---------------- */}
        <div className="hidden lg:flex items-center gap-8">

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
            } hover:text-[#A66A3A]`}
          >
            {t.registerCrop}
          </Link>

          <LanguageToggle />

          {/* ---------------- AUTH SECTION ---------------- */}
          {!user ? (
            <Link
              href="/auth/signin"
              className={`px-4 py-2 rounded-lg font-semibold transition-all shadow-sm ${
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
                  src={user.photoURL || "/images/default.svg"}
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

        {/* ---------------- MOBILE BUTTON ---------------- */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden text-3xl transition-all ${
            scrolled ? "text-[#5A381F]" : "text-white"
          }`}
        >
          ☰
        </button>
      </div>

      {/* ---------------- MOBILE MENU ---------------- */}
      {menuOpen && (
        <div
          className={`lg:hidden px-4 pb-5 flex flex-col gap-4 border-t backdrop-blur-md transition-all ${
            scrolled
              ? "bg-[#F7EEDC]/95 border-[#E2C9A6]"
              : "bg-black/40 border-white/10"
          }`}
        >
          <Link
            href="/weather"
            className={`py-1 font-medium ${
              scrolled ? "text-[#5A381F]" : "text-white"
            } hover:text-[#A66A3A]`}
          >
            {t.weather}
          </Link>

          <Link
            href="/farmers"
            className={`py-1 font-medium ${
              scrolled ? "text-[#5A381F]" : "text-white"
            } hover:text-[#A66A3A]`}
          >
            {t.farmers}
          </Link>

          <Link
            href="/crops/register"
            className={`py-1 font-medium ${
              scrolled ? "text-[#5A381F]" : "text-white"
            } hover:text-[#A66A3A]`}
          >
            {t.registerCrop}
          </Link>

          <LanguageToggle />

          {/* MOBILE AUTH VIEW */}
          {!user ? (
            <Link
              href="/auth/signin"
              className={`px-4 py-2 rounded-lg w-fit ${
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
                src={user.photoURL || "/images/default.svg"}
                alt="User"
                width={40}
                height={40}
                className="rounded-full border border-white/30"
              />
              <Link href="/dashboard" className="text-white font-medium hover:text-[#A66A3A]">
                {t.dashboard}
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
