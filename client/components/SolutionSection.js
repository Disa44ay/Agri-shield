"use client";

import { useLanguage } from "@/app/LanguageContext";
import SolutionFlowSVG from "@/components/SolutionFlowSVG";

export default function SolutionSection() {
  const { lang } = useLanguage();

  const text = {
    en: {
      howWorks: "From Data to Saved Food",
      line: "AgriShield detects risks early using sensors, weather warnings and field insights.",
    },
    bn: {
      howWorks: "ডেটা থেকে বাঁচানো খাদ্য পর্যন্ত",
      line: "সেন্সর ডেটা, আবহাওয়া সতর্কতা ও মাঠের তথ্য বিশ্লেষণ করে AgriShield আগে থেকেই ঝুঁকি শনাক্ত করে।",
    },
  };

  return (
    <section className="py-24 scroll-reveal">

      {/* Title */}
      <h2 className="text-4xl font-extrabold text-center text-[#F4D9A3] drop-shadow-lg">
        {text[lang].howWorks}
      </h2>

      {/* Subtitle */}
      <p className="mt-4 text-center text-[#FFF7E6] text-base max-w-2xl mx-auto leading-relaxed drop-shadow">
        {text[lang].line}
      </p>

      {/* Flow Diagram */}
      <div className="mt-14">
        <SolutionFlowSVG />
      </div>
    </section>
  );
}
