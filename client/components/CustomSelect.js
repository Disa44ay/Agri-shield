"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomSelect({ label, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full text-white">
      <label className="text-sm text-[#F4D9A3]">{label}</label>

      {/* Selected Box */}
      <div
        onClick={() => setOpen(!open)}
        className="
          mt-1 p-3 rounded-lg cursor-pointer
          bg-white/10 border border-white/25
          backdrop-blur-md
          flex justify-between items-center
        "
      >
        <span className="text-white/90">
          {value || "Select..."}
        </span>

        <span className="text-[#F4D9A3]">▼</span>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="
              absolute mt-2 w-full max-h-60 overflow-y-auto
              bg-black/40 backdrop-blur-xl
              border border-white/20 rounded-xl shadow-xl z-50
            "
          >
            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="
                  p-3 text-sm cursor-pointer transition
                  hover:bg-white/20 text-white/90
                "
              >
                {opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
