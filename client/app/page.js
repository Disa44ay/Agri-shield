"use client";

import { useEffect } from "react";
import FarmerAnimation from "@/components/FarmerAnimation";
import { useLanguage } from "@/app/LanguageContext";
import LandingSections from "@/components/ProblemSection";
import dynamic from "next/dynamic";
import SDGHighlight from "@/components/SDGHighlight";

// Load Top Farmers WITHOUT SSR → prevents hydration mismatch
const TopFarmersSection = dynamic(
  () => import("@/components/TopFarmersSection"),
  { ssr: false }
);

export default function LandingPage() {
  const { lang } = useLanguage();

  const text = {
    en: {
      title: "Bangladesh is losing food before it reaches the plate.",
      heroStrong: "AgriShield turns data into protection.",
      subtitle:
        "Millions of tonnes of food are lost every year — in storage, in transit, and in the field. AgriShield warns farmers early, reducing waste and protecting income.",
      getStarted: "Start as a Farmer",
      stat1: "4.5M+ tonnes lost yearly",
      stat2: "$1.5B economic loss yearly",
      stat3: "12–32% loss across essential crops",
    },
    bn: {
      title: "থালায় পৌঁছানোর আগে নষ্ট হয়ে যাচ্ছে আমাদের খাবার।",
      heroStrong: "AgriShield ডেটাকে রক্ষা-কবচে পরিণত করে।",
      subtitle:
        "বাংলাদেশে প্রতি বছর লক্ষ লক্ষ টন খাদ্য নষ্ট হয়—গোডাউনে, পরিবহনে, আর মাঠে। AgriShield আগে থেকেই সংকেত দেয়, যাতে কৃষকের ক্ষতি কমে।",
      getStarted: "কৃষক হিসেবে শুরু করুন",
      stat1: "৪.৫ মিলিয়ন+ টন অপচয়",
      stat2: "১.৫ বিলিয়ন ডলার অর্থনৈতিক ক্ষতি",
      stat3: "১২–৩২% খাদ্য অপচয়",
    },
  };

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      })
    );
    els.forEach((el) => observer.observe(el));
  }, []);

  return (
    <main className="w-full text-white">

      {/* HERO */}
      <section className="relative w-full min-h-[92vh] flex items-center">
        <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-20">

          {/* LEFT */}
          <div className="flex-1 fade-up" style={{ textShadow: "0 3px 6px rgba(0,0,0,0.9)" }}>
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
              {text[lang].title}
            </h1>

            <p className="mt-5 text-2xl lg:text-3xl font-bold text-[#F9DFA9] drop-shadow-xl">
              {text[lang].heroStrong}
            </p>

            <div className="mt-6 max-w-xl p-5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
              <p className="text-lg lg:text-xl text-[#FFF9E8] leading-relaxed">
                {text[lang].subtitle}
              </p>
            </div>

            <button
              onClick={() => (window.location.href = "/auth/signup")}
              className="mt-10 px-7 py-3 rounded-xl text-lg font-semibold bg-[#A66A3A] hover:bg-[#8c562e] text-white shadow-xl transition-all inline-flex items-center gap-2"
            >
              {text[lang].getStarted} →
            </button>

            <div className="mt-10 grid sm:grid-cols-3 gap-4 text-sm">
              {[text[lang].stat1, text[lang].stat2, text[lang].stat3].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-xl p-4 text-center shadow-lg"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.7)" }}
                >
                  <p className="font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 fade-delay-2 h-[480px] lg:h-[650px] scale-[1.55] drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
            <FarmerAnimation />
          </div>

        </div>
      </section>

      {/* Client-only sections */}
      <TopFarmersSection />
      <LandingSections />
      <SDGHighlight></SDGHighlight>
    </main>
  );
}
