"use client";

import { useLanguage } from "@/app/LanguageContext";

export default function ProblemSection() {
  const { lang } = useLanguage();

  const text = {
    en: {
      problemTitle: "The Reality We Can't Ignore",
      problemText:
        "Over 4.5 million tonnes of food grains are lost each year due to poor storage, handling, and transport.",
    },
    bn: {
      problemTitle: "যে বাস্তবতা এড়ানো যায় না",
      problemText:
        "প্রতি বছর ৪.৫ মিলিয়নেরও বেশি টন খাদ্যশস্য নষ্ট হয় খারাপ সংরক্ষণ ও পরিবহনের কারণে।",
    },
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-24 scroll-reveal">

      <div
        className="
          bg-black/40 
          backdrop-blur-md 
          border border-white/10 
          rounded-2xl 
          p-8 
          mx-auto 
          max-w-3xl 
          shadow-xl
          text-center
        "
      >
        <h2 className="text-4xl font-bold text-[#F4D9A3] drop-shadow-xl">
          {text[lang].problemTitle}
        </h2>

        <p className="mt-4 text-[#FFF7E6] text-lg leading-relaxed">
          {text[lang].problemText}
        </p>
      </div>

    </section>
  );
}
