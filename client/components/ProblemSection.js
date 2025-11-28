"use client";

import { useLanguage } from "@/app/LanguageContext";

export default function LandingSections() {
  const { lang } = useLanguage();

  const text = {
    en: {
      problemTitle: "The Reality We Can't Ignore",
      problemText:
        "Over 4.5 million tonnes of food grains are lost each year due to poor storage, handling, and transport.",
      howWorks: "From Data to Saved Food",
      line: "AgriShield detects risks early using sensors, weather warnings and field insights.",
    },
    bn: {
      problemTitle: "যে বাস্তবতা এড়ানো যায় না",
      problemText:
        "প্রতি বছর ৪.৫ মিলিয়নেরও বেশি টন খাদ্যশস্য নষ্ট হয় খারাপ সংরক্ষণ ও পরিবহনের কারণে।",
      howWorks: "ডেটা থেকে বাঁচানো খাদ্য পর্যন্ত",
      line: "সেন্সর ডেটা, আবহাওয়া সতর্কতা ও মাঠের তথ্য বিশ্লেষণ করে AgriShield আগে থেকেই ঝুঁকি শনাক্ত করে।",
    },
  };

  return (
    <section
      className="
        max-w-7xl mx-auto 
        px-4 sm:px-6 lg:px-10 
        py-16 sm:py-20 lg:py-28 
        flex flex-col lg:flex-row 
        items-center lg:items-start 
        justify-center 
        gap-10 sm:gap-14 lg:gap-20
      "
    >
      {/* PROBLEM */}
      <div
        className="
          flex-1 w-full max-w-xl 
          bg-black/40 backdrop-blur-md 
          border border-white/10 
          rounded-2xl 
          p-6 sm:p-8 
          shadow-xl 
          text-center
        "
      >
        <h2
          className="
            text-3xl sm:text-4xl lg:text-5xl 
            font-bold 
            text-[#F4D9A3] 
            drop-shadow-xl
          "
        >
          {text[lang].problemTitle}
        </h2>

        <p
          className="
            mt-4 
            text-[#FFF7E6] 
            text-base sm:text-lg lg:text-xl 
            leading-relaxed
          "
        >
          {text[lang].problemText}
        </p>
      </div>

      {/* SOLUTION */}
      <div className="flex-1 w-full max-w-xl text-center">
        <div
          className="
            p-6 sm:p-8 
            rounded-3xl 
            bg-black/30 backdrop-blur-xl 
            border border-white/10 
            shadow-[0_8px_30px_rgba(0,0,0,0.5)]
          "
        >
          <h2
            className="
              text-3xl sm:text-4xl lg:text-5xl 
              font-extrabold 
              text-[#F4D9A3] 
              drop-shadow-xl 
              tracking-wide
            "
          >
            {text[lang].howWorks}
          </h2>

          <p
            className="
              mt-4 
              text-[#FFF7E6] 
              text-base sm:text-lg lg:text-xl 
              leading-relaxed 
              max-w-md mx-auto 
              drop-shadow
            "
          >
            {text[lang].line}
          </p>
        </div>
      </div>
    </section>
  );
}
