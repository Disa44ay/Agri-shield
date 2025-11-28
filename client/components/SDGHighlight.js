"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/app/LanguageContext";

export default function SDGHighlight() {

  const { lang } = useLanguage();

  const text = {
    en: {
      title: "SDG 12 — Responsible Consumption & Production",
      desc: "This platform contributes directly to Target 12.3, aiming to reduce food losses across farming, handling, and supply chains — strengthening sustainability for farmers and communities.",
      highlight: "Target 12.3",
    },
    bn: {
      title: "এসডিজি ১২ — দায়িত্বশীল ভোগ ও উৎপাদন",
      desc: "এই প্ল্যাটফর্মটি সরাসরি টার্গেট ১২.৩ অর্জনে কাজ করে, যা উৎপাদন, পরিবহন ও সরবরাহ চেইনে খাদ্য অপচয় কমানোর উপর গুরুত্ব দেয় — কৃষক ও সমাজের টেকসই উন্নয়নে সহায়তা করে।",
      highlight: "টার্গেট ১২.৩",
    },
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="
          relative max-w-5xl mx-auto 
          bg-white/10 backdrop-blur-2xl 
          border border-white/20 
          shadow-[0_8px_40px_rgba(0,0,0,0.45)]
          rounded-3xl p-8 sm:p-10 lg:p-14
          overflow-hidden
        "
      >
        {/* Accent Glow */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-500/60 via-amber-300/80 to-yellow-600/60 rounded-t-3xl" />

        {/* Shimmer */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/10 to-transparent opacity-20 pointer-events-none"
        />

        {/* Content */}
        <div className="relative z-10 text-center">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F4D9A3] drop-shadow-xl">
            {text[lang].title}
          </h3>

          <p
            className="mt-5 text-[#FFF7E6] text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto drop-shadow"
            dangerouslySetInnerHTML={{
              __html: text[lang].desc.replace(
                text[lang].highlight,
                `<strong class="text-[#FFDDAE] font-semibold">${text[lang].highlight}</strong>`
              ),
            }}
          ></p>

        </div>
      </motion.div>
    </section>
  );
}
