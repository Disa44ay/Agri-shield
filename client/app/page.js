"use client";

import { useEffect, useState } from "react";
import FarmerAnimation from "@/components/FarmerAnimation";
import SolutionFlowSVG from "@/components/SolutionFlowSVG";

export default function LandingPage() {
  const [lang, setLang] = useState("en");

  const text = {
    en: {
      title: "Bangladesh is losing food before it reaches the plate.",
      heroStrong: "AgriShield turns data into protection.",
      subtitle:
        "Millions of tonnes of food are lost every year — in storage, in transit, and in the field. AgriShield warns farmers early, reducing waste and protecting income.",
      getStarted: "Start as a Farmer",
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
      heroStrong: "AgriShield ডেটাকে রক্ষা-কবচে পরিণত করে।",
      subtitle:
        "বাংলাদেশে প্রতি বছর লক্ষ লক্ষ টন খাদ্য নষ্ট হয়—গোডাউনে, পরিবহনে, আর মাঠে। AgriShield আগে থেকেই সংকেত দেয়, যাতে কৃষকের ক্ষতি কমে।",
      getStarted: "কৃষক হিসেবে শুরু করুন",
      problemTitle: "যে বাস্তবতা এড়ানো যায় না",
      problemText:
        "প্রতি বছর ৪.৫ মিলিয়নেরও বেশি টন খাদ্যশস্য নষ্ট হয় খারাপ সংরক্ষণ ও পরিবহনের কারণে।",
      howWorks: "ডেটা থেকে বাঁচানো খাদ্য পর্যন্ত",
      stat1: "৪.৫ মিলিয়ন+ টন অপচয়",
      stat2: "১.৫ বিলিয়ন ডলার অর্থনৈতিক ক্ষতি",
      stat3: "১২–৩২% খাদ্য অপচয়",
    },
  };

  // Scroll reveal animations
  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-reveal");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
        }
      });
    });

    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <main className="w-full text-white">

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[90vh] flex items-center">

        <div className="relative max-w-6xl mx-auto px-4 py-24 flex flex-col lg:flex-row items-center gap-16">

          {/* LEFT TEXT */}
          <div className="flex-1 fade-up drop-shadow-[0_3px_6px_rgba(0,0,0,0.55)]">
            <h1 className="text-3xl lg:text-5xl font-bold leading-snug">
              {text[lang].title}
            </h1>

            <p className="mt-4 text-2xl lg:text-3xl font-semibold text-[#F4D9A3]">
              {text[lang].heroStrong}
            </p>

            <p className="mt-6 text-lg lg:text-xl text-[#F7EEDC] max-w-xl leading-relaxed">
              {text[lang].subtitle}
            </p>

            <button
              onClick={() => (window.location.href = "/auth/signup")}
              className="
                mt-10 px-7 py-3 rounded-xl text-lg font-semibold
                bg-[#A66A3A] hover:bg-[#8c562e] text-white shadow-xl
                transition-all backdrop-blur-sm inline-flex items-center gap-2
              "
            >
              {text[lang].getStarted} →
            </button>

            {/* Stats */}
            <div className="mt-10 grid sm:grid-cols-3 gap-4 text-sm fade-delay-3">
              {[text[lang].stat1, text[lang].stat2, text[lang].stat3].map(
                (t, i) => (
                  <div
                    key={i}
                    className="
                      bg-white/20 backdrop-blur-md border border-white/30
                      rounded-xl p-4 text-center shadow-lg text-white
                    "
                  >
                    <p className="font-semibold">{t}</p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* RIGHT LOTTIE — Bigger + cinematic */}
          <div className="flex-1 fade-delay-2 h-[350px] lg:h-[480px] scale-110">
            <FarmerAnimation />
          </div>

        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 scroll-reveal">
        <h2 className="text-4xl font-bold text-[#F4D9A3] text-center drop-shadow-lg">
          {text[lang].problemTitle}
        </h2>

        <p className="mt-6 text-center text-[#FFF7E6] max-w-3xl mx-auto text-lg leading-relaxed drop-shadow">
          {text[lang].problemText}
        </p>
      </section>

      {/* SOLUTION FLOW */}
      <section className="bg-[#FFF8EC]/95 py-16 scroll-reveal border-y border-[#E2C9A6]">
        <h2 className="text-3xl font-bold text-[#A66A3A] text-center">
          {text[lang].howWorks}
        </h2>

        <p className="mt-4 text-center text-[#5A381F] text-sm max-w-2xl mx-auto">
          সেন্সর ডেটা, আবহাওয়া সতর্কতা ও মাঠের তথ্য বিশ্লেষণ করে AgriShield আগে থেকেই ঝুঁকি শনাক্ত করে।
        </p>

        <SolutionFlowSVG />
      </section>

    </main>
  );
}
