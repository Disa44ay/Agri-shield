"use client";

export default function LanguageToggle({ lang, setLang }) {
  return (
    <button
      onClick={() => setLang(lang === "en" ? "bn" : "en")}
      className="px-4 py-1 bg-green-700 text-white rounded-lg text-sm"
    >
      {lang === "en" ? "বাংলা" : "English"}
    </button>
  );
}
