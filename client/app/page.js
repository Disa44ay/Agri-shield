"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FarmerAnimation from "@/components/FarmerAnimation";
import SolutionFlowSVG from "@/components/SolutionFlowSVG";

export default function LandingPage() {
  const [lang, setLang] = useState("en");

  const text = {
    en: {
      title: "Bangladesh is losing food before it reaches the plate.",
      heroStrong: "HarvestGuard turns data into protection.",
      subtitle:
        "Millions of tonnes of food are lost every year — in storage, in transit, and in the field. HarvestGuard warns farmers early, reducing waste and protecting income.",
      getStarted: "Start as a Farmer",
      sdg: "Aligned with SDG 12.3 — Reduce food loss across the supply chain.",
      problemTitle: "The Reality We Can't Ignore",
      problemText:
        "Over 4.5 million tonnes of food grains are lost each year due to poor storage, handling, and transport.",
      howWorks: "From Data to Saved Food",
      stat1: "4.5M+ tonnes lost yearly",
      stat2: "$1.5B economic loss yearly",
      stat3: "12–32% loss across essential crops",
    },
    bn: {
      title: "থালার আগে নষ্ট হয়ে যাচ্ছে আমাদের খাবার।",
      heroStrong: "হারভেস্টগার্ড ডেটাকে রক্ষা-কবচে পরিণত করে।",
      subtitle:
        "বাংলাদেশে প্রতি বছর লক্ষ লক্ষ টন খাদ্য নষ্ট হয়—গোডাউনে, পরিবহনে, আর মাঠে।",
      getStarted: "কৃষক হিসেবে শুরু করুন",
      sdg: "এসডিজি ১২.৩ — সরবরাহ শৃঙ্খলে খাদ্য অপচয় কমানোর লক্ষ্য।",
      problemTitle: "যে বাস্তবতা এড়ানো যায় না",
      problemText:
        "প্রতি বছর ৪.৫ মিলিয়নেরও বেশি টন খাদ্যশস্য নষ্ট হয় সংরক্ষণ ও পরিবহনের সমস্যার কারণে।",
      howWorks: "ডেটা থেকে বাঁচানো খাদ্য পর্যন্ত",
      stat1: "৪.৫ মিলিয়ন+ টন অপচয়",
      stat2: "১.৫ বিলিয়ন ডলার ক্ষতি",
      stat3: "১২–৩২% খাদ্য অপচয়",
    },
  };

  // Scroll reveal animation
  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    });
    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <main className="w-full bg-[#F7EEDC] text-[#5A381F]">

      {/* NAVBAR WITH LANGUAGE */}
      <Navbar lang={lang} setLang={setLang} />

      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-4 pt-28 pb-24 flex flex-col lg:flex-row items-center gap-12">

        {/* LEFT TEXT */}
        <div className="flex-1 fade-up">
          <h1 className="text-3xl lg:text-4xl font-bold leading-snug text-[#5A381F]">
            {text[lang].title}
          </h1>

          <p className="mt-3 text-xl lg:text-2xl font-semibold text-[#A66A3A]">
            {text[lang].heroStrong}
          </p>

          <p className="mt-6 text-base lg:text-lg text-[#7A6A54] max-w-xl">
            {text[lang].subtitle}
          </p>

          <button
            onClick={() => (window.location.href = "/auth/signup")}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#A66A3A] text-white font-semibold rounded-xl text-lg hover:bg-[#8c562e] transition-all shadow-md fade-delay-1"
          >
            {text[lang].getStarted} →
          </button>

          {/* STATS */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4 text-xs sm:text-sm fade-delay-3">
            {[text[lang].stat1, text[lang].stat2, text[lang].stat3].map((t, i) => (
              <div
                key={i}
                className="bg-[#FFF8EC] border border-[#E2C9A6] rounded-xl p-4 shadow-sm text-center text-[#5A381F]"
              >
                <p className="font-semibold">{t}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT LOTTIE ANIMATION */}
        <div className="flex-1 fade-delay-2 h-72 lg:h-96">
          <FarmerAnimation />
        </div>

      </section>

      {/* PROBLEM SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-20 scroll-reveal">
        <h2 className="text-3xl font-bold text-[#A66A3A] text-center">
          {text[lang].problemTitle}
        </h2>
        <p className="mt-6 text-center text-[#5A381F] max-w-3xl mx-auto">
          {text[lang].problemText}
        </p>
      </section>

      {/* FLOW SECTION */}
      <section className="bg-[#FFF8EC] py-16 scroll-reveal border-y border-[#E2C9A6]">
        <h2 className="text-3xl font-bold text-[#A66A3A] text-center">
          {text[lang].howWorks}
        </h2>

        <p className="mt-4 text-center text-[#5A381F] text-sm max-w-2xl mx-auto">
          সেন্সর ডেটা, আবহাওয়া সতর্কতা ও মাঠের তথ্য বিশ্লেষণ করে 
          হারভেস্টগার্ড ঝুঁকি আগেই শনাক্ত করে।
        </p>

        <SolutionFlowSVG />
      </section>

    </main>
  );
}
