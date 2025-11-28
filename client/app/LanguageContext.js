"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("bn"); // SSR-safe default
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lang");

    // Fix React warning: defer state updates
    queueMicrotask(() => {
      if (saved) setLang(saved);
      setReady(true);
    });
  }, []);

  // Prevent hydration mismatch – render nothing until ready
  if (!ready) return null;

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
