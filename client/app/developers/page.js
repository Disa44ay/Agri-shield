"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/app/LanguageContext";

export default function DevelopersPage() {
  const { lang } = useLanguage();

  // 🔥 TEXT TRANSLATION
  const text = {
    en: {
      title: "Meet the Developers",
      subtitle: "The dedicated team behind AgriShield — transforming data into real impact.",
      roles: {
        faisal: "UI Designer • Frontend Developer • Team Lead",
        sakib: "Frontend Developer",
        sayeed: "Backend Developer",
      }
    },
    bn: {
      title: "ডেভেলপারদের সাথে পরিচিত হোন",
      subtitle: "AgriShield-এর নিবেদিত দল — যারা প্রযুক্তিকে বাস্তব সমাধানে রূপ দিচ্ছে।",
      roles: {
        faisal: "UI ডিজাইনার • ফ্রন্টএন্ড ডেভেলপার • টিম লিড",
        sakib: "ফ্রন্টএন্ড ডেভেলপার",
        sayeed: "ব্যাকএন্ড ডেভেলপার",
      }
    }
  };

  const developers = [
    {
      name: "Md. Faisal Ahmed",
      id: "223001612",
      role: text[lang].roles.faisal,
      img: "/images/Ahmed.svg",
    },
    {
      name: "Md. Shahidul Islam Sakib",
      id: "223001712",
      role: text[lang].roles.sakib,
      img: "/images/shahidul.svg",
    },
    {
      name: "Abdullah Abu Sayeed",
      id: "223001112",
      role: text[lang].roles.sayeed,
      img: "/images/Abdullah.svg",
    },
  ];

  return (
    <main className="min-h-screen w-full px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 pb-20 text-white">

      {/* PAGE TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-[#F4D9A3]
        drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]"
      >
        {text[lang].title}
      </motion.h1>

      {/* SUBTITLE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto mt-4 text-center text-[#FFF7E6] 
        text-base sm:text-lg drop-shadow px-4"
      >
        {text[lang].subtitle}
      </motion.p>

      {/* GRID */}
      <div
        className="
          mt-14 grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-10 
          max-w-7xl mx-auto
        "
      >
        {developers.map((dev, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="
              relative 
              bg-white/10 backdrop-blur-2xl 
              border border-white/20 
              rounded-3xl 
              p-6 sm:p-8 lg:p-10 
              shadow-[0_20px_60px_rgba(0,0,0,0.55)]
              hover:shadow-[0_30px_80px_rgba(0,0,0,0.75)]
              transition-all duration-300
              text-center
            "
          >

            {/* IMAGE (Responsive Square) */}
            <div
              className="
                w-40 h-40
                sm:w-48 sm:h-48
                lg:w-56 lg:h-56
                xl:w-60 xl:h-60
                rounded-2xl overflow-hidden
                border border-white/20 
                shadow-[0_12px_35px_rgba(0,0,0,0.65)]
                bg-white/5 backdrop-blur-md
                mx-auto
              "
            >
              <Image
                src={dev.img}
                alt={dev.name}
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>

            {/* NAME */}
            <h2 className="mt-6 text-xl sm:text-2xl font-bold text-[#F4D9A3] drop-shadow-lg">
              {dev.name}
            </h2>

            {/* ID */}
            <p className="text-[#FFF7E6]/80 text-xs sm:text-sm mt-1">
              <span className="text-[#FFDDAE] font-semibold">ID:</span> {dev.id}
            </p>

            {/* ROLE */}
            <p className="mt-4 text-[#FFF7E6] text-sm sm:text-base leading-relaxed max-w-xs mx-auto px-2">
              {dev.role}
            </p>

            {/* GLOW LINE */}
            <div className="mt-6 w-20 sm:w-24 h-[3px] bg-gradient-to-r from-transparent via-[#F4D9A3] to-transparent mx-auto opacity-70"></div>

          </motion.div>
        ))}
      </div>

    </main>
  );
}
