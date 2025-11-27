"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageToggle from "@/components/LanguageToggle";

export default function Navbar({ lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#F7EEDC] shadow-md fixed top-0 left-0 z-50 border-b border-[#E2C9A6]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#5A381F]">
          HarvestGuard
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-6">

          <Link href="/weather" className="hover:text-[#A66A3A]">
            Weather
          </Link>

          <Link href="/farmers" className="hover:text-[#A66A3A]">
            Farmers
          </Link>

          <Link href="/crops/register" className="hover:text-[#A66A3A]">
            Register Crop
          </Link>

          {/* DaisyUI Slider Toggle */}
          <LanguageToggle lang={lang} setLang={setLang} />

          <Link
            href="/auth/signin"
            className="px-4 py-2 bg-[#A66A3A] text-white rounded-lg hover:bg-[#8c562e]"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-[#5A381F] text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 flex flex-col gap-3 bg-[#F7EEDC] border-t border-[#E2C9A6]">

          <Link href="/weather" className="hover:text-[#A66A3A] py-1">
            Weather
          </Link>

          <Link href="/farmers" className="hover:text-[#A66A3A] py-1">
            Farmers
          </Link>

          <Link href="/crops/register" className="hover:text-[#A66A3A] py-1">
            Register Crop
          </Link>

          {/* DaisyUI Toggle in mobile */}
          <LanguageToggle lang={lang} setLang={setLang} />

          <Link
            href="/auth/signin"
            className="px-4 py-2 bg-[#A66A3A] text-white rounded-lg hover:bg-[#8c562e] inline-block"
          >
            Login
          </Link>

        </div>
      )}
    </nav>
  );
}
