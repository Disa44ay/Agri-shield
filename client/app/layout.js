"use client";

import "./globals.css";
import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  const [lang, setLang] = useState("en");

  return (
    <html lang="en">
      <body>
        <Navbar lang={lang} setLang={setLang} />
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
