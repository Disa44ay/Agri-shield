"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageToggle from "@/components/LanguageToggle";

export default function Navbar({ lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        w-full fixed top-0 left-0 z-50 transition-all duration-300 border-b
        ${scrolled
          ? "bg-[#F7EEDC]/70 backdrop-blur-md border-[#E2C9A6]"
          : "bg-transparent border-transparent"
        }
      `}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link
          href="/"
          className={`
            text-3xl font-extrabold tracking-tight transition-all
            ${scrolled ? "text-[#5A381F]" : "text-white"}
          `}
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Agri<span className="text-[#A66A3A]">Shield</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">

          <Link
            href="/weather"
            className={`
              font-medium transition-all
              ${scrolled ? "text-[#5A381F]" : "text-white"}
              hover:text-[#A66A3A]
            `}
          >
            Weather
          </Link>

          <Link
            href="/farmers"
            className={`
              font-medium transition-all
              ${scrolled ? "text-[#5A381F]" : "text-white"}
              hover:text-[#A66A3A]
            `}
          >
            Farmers
          </Link>

          <Link
            href="/crops/register"
            className={`
              font-medium transition-all
              ${scrolled ? "text-[#5A381F]" : "text-white"}
              hover:text-[#A66A3A]
            `}
          >
            Register Crop
          </Link>

          {/* Language Toggle */}
          <div className="ml-2">
            <LanguageToggle lang={lang} setLang={setLang} />
          </div>

          {/* Login Button */}
          <Link
            href="/auth/signin"
            className={`
              px-4 py-2 rounded-lg font-semibold transition-all shadow-sm
              ${scrolled
                ? "bg-[#A66A3A] text-white hover:bg-[#8c562e]"
                : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"}
            `}
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`
            lg:hidden text-3xl transition-all
            ${scrolled ? "text-[#5A381F]" : "text-white"}
          `}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`
            lg:hidden px-4 pb-4 flex flex-col gap-4 border-t backdrop-blur-md transition-all
            ${scrolled ? "bg-[#F7EEDC]/95 border-[#E2C9A6]" : "bg-black/40 border-white/10"}
          `}
        >

          <Link
            href="/weather"
            className={`
              py-1 font-medium transition-all
              ${scrolled ? "text-[#5A381F]" : "text-white"}
              hover:text-[#A66A3A]
            `}
          >
            Weather
          </Link>

          <Link
            href="/farmers"
            className={`
              py-1 font-medium transition-all
              ${scrolled ? "text-[#5A381F]" : "text-white"}
              hover:text-[#A66A3A]
            `}
          >
            Farmers
          </Link>

          <Link
            href="/crops/register"
            className={`
              py-1 font-medium transition-all
              ${scrolled ? "text-[#5A381F]" : "text-white"}
              hover:text-[#A66A3A]
            `}
          >
            Register Crop
          </Link>

          {/* Language toggle */}
          <LanguageToggle lang={lang} setLang={setLang} />

          <Link
            href="/auth/signin"
            className={`
              px-4 py-2 rounded-lg transition-all w-fit
              ${scrolled
                ? "bg-[#A66A3A] text-white hover:bg-[#8c562e]"
                : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"}
            `}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
