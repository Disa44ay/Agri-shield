"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/app/LanguageContext";
import { Providers } from "@/app/providers";   // ✅ React Query Provider
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");

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
        {/* React Query + Language Providers */}
        <Providers>
          <LanguageProvider>
            {/* Top gradient overlay */}
            <div className="fixed inset-0 bg-gradient-to-b from-black/90 via-black/20 to-transparent pointer-events-none z-0"></div>

            {/* Hide navbar on auth pages */}
            {!isAuthPage && <Navbar />}

            {/* Page content */}
            <main className="relative z-10 pt-16">{children}</main>

            {!isAuthPage && <Footer></Footer>}
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
