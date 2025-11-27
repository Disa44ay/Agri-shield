"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/app/LanguageContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="min-h-screen w-full relative"
        style={{
          backgroundImage: "url('/images/hero-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <LanguageProvider>
          <div className="fixed inset-0 bg-gradient-to-b from-black/90 via-black/20 to-transparent pointer-events-none z-0"></div>

          <Navbar />

          <main className="relative z-10 pt-16">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
