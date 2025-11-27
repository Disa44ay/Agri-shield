"use client";

import "./globals.css";
import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  const [lang, setLang] = useState("en");

  return (
    <html lang={lang}>
      <body
        className="min-h-screen w-full relative"
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* TOP GRADIENT – visible only on hero area */}
        <div className="fixed inset-0 bg-gradient-to-b from-black/80 via-black/10 to-transparent pointer-events-none z-0"></div>

        {/* NAVBAR on top */}
        <Navbar lang={lang} setLang={setLang} />

        <main className="relative z-10 pt-16">{children}</main>
      </body>
    </html>
  );
}
