"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("bn"); // Default language is Bangla (bn)
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lang");

    queueMicrotask(() => {
      if (saved) setLang(saved);
      setReady(true);
    });
  }, []);

  const toggleLang = () => {
    const newLang = lang === "bn" ? "en" : "bn"; // Toggle between Bangla and English
    setLang(newLang);
    localStorage.setItem("lang", newLang); 
  };


  if (!ready) return null;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
