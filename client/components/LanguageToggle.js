"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LanguageToggle({ lang, setLang }) {
  const isEnglish = lang === "en";
  const [ripple, setRipple] = useState(false);

  // Load saved language
  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("lang");
    if (saved === "en" || saved === "bn") {
      setLang(saved);
    }
  }, [setLang]);

  // Save language on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
    }
  }, [lang]);

  const handleToggle = () => {
    setRipple(true);
    setTimeout(() => setRipple(false), 350);
    setLang(isEnglish ? "bn" : "en");
  };

  return (
    <div
      className="relative w-24 h-9 bg-[#E2C9A6] rounded-full cursor-pointer flex items-center px-1"
      onClick={handleToggle}
      style={{
        boxShadow: "inset 0 0 8px rgba(0,0,0,0.25)",
        overflow: "hidden",
      }}
    >
      {/* Ripple effect */}
      {ripple && (
        <span
          className="absolute rounded-full bg-[#A66A3A]/25 animate-ripple"
          style={{
            width: 120,
            height: 120,
            left: isEnglish ? "-30px" : "30px",
            top: "-40px",
          }}
        />
      )}

      {/* Sliding knob with spring physics */}
      <motion.div
        className={`absolute w-10 h-8 rounded-full shadow-md ${
          isEnglish ? "bg-[#A66A3A]" : "bg-[#A66A3A] glow-active"
        }`}
        initial={false}
        animate={{
          x: isEnglish ? 0 : 56,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      />

      {/* Labels */}
      <div className="relative z-10 flex justify-between w-full text-xs font-semibold px-1 select-none">
        <span className={isEnglish ? "text-white" : "text-[#5A381F]"}>
          EN
        </span>
        <span className={!isEnglish ? "text-white" : "text-[#5A381F]"}>
          বাংলা
        </span>
      </div>
    </div>
  );
}
