"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/app/LanguageContext";
import Image from "next/image";

export default function TopFarmersSection() {
  const { lang } = useLanguage();

  const text = {
    en: {
      title: "Top Farmers of the Month",
      subtitle: "Recognizing the most active and dedicated farmers",
    },
    bn: {
      title: "এই মাসের সেরা কৃষকরা",
      subtitle: "সবচেয়ে সক্রিয় এবং নিবেদিত কৃষকদের স্বীকৃতি",
    },
  };

  const farmers = [
    {
      name: "Abdul Karim",
      location: "Rajshahi",
      crops: "Mango, Wheat",
      avatar: "/images/Male-Farmer2.svg",
    },
    {
      name: "Rahima Begum",
      location: "Mymensingh",
      crops: "Rice, Vegetables",
      avatar: "/images/Female-Farmer.svg",
    },
    {
      name: "Shahin Miah",
      location: "Cumilla",
      crops: "Potato, Tomato",
      avatar: "/images/Male-Farmer.svg",
    },
  ];

  const container = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const cardAnim = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-28">
      
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-[#F4D9A3] drop-shadow-[0_5px_25px_rgba(0,0,0,0.8)]"
      >
        {text[lang].title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mt-3 text-center text-[#FFF7E6] text-base md:text-lg max-w-2xl mx-auto drop-shadow"
      >
        {text[lang].subtitle}
      </motion.p>

      {/* Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="
          mt-16 grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-10
        "
      >
        {farmers.map((f, i) => (
          <motion.div
            key={i}
            variants={cardAnim}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.08, y: -10 }}
            className="
              relative overflow-hidden
              bg-white/10 
              backdrop-blur-2xl 
              border border-white/20 
              rounded-3xl p-8
              shadow-[0_15px_45px_rgba(0,0,0,0.55)]
              hover:shadow-[0_30px_70px_rgba(0,0,0,0.7)]
              transition-all duration-300
              flex flex-col items-center
            "
          >
            {/* Soft gradient glow behind card */}
            <div className="
              absolute inset-0 
              bg-gradient-to-br 
              from-white/10 via-transparent to-white/5
              pointer-events-none
            "></div>

            {/* Shine overlay on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              className="
                absolute inset-0 
                bg-gradient-to-t from-white/20 to-transparent
                pointer-events-none
              "
            ></motion.div>

            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.15 }}
              className="relative z-10"
            >
              <div
                className="
                  w-28 h-28 md:w-32 md:h-32 
                  rounded-full overflow-hidden 
                  shadow-2xl border border-white/40
                  bg-white/10 backdrop-blur-xl
                  relative
                "
              >
                {/* Reflection */}
                <div
                  className="
                    absolute inset-0 
                    bg-gradient-to-br from-white/30 to-transparent 
                    pointer-events-none
                  "
                ></div>

                <Image
                  src={f.avatar}
                  alt={f.name}
                  width={128}
                  height={128}
                  className="object-cover relative z-10"
                />
              </div>
            </motion.div>

            {/* Name */}
            <h3 className="mt-5 text-2xl font-bold text-[#F4D9A3] drop-shadow-xl text-center z-10">
              {f.name}
            </h3>

            {/* Location */}
            <p className="text-[#FFF7E6]/90 text-sm md:text-base text-center mt-1 z-10">
              📍 {f.location}
            </p>

            {/* Crops */}
            <p className="mt-3 text-[#FFF7E6] text-sm md:text-base text-center z-10">
              <span className="font-semibold">
                {lang === "en" ? "Crops:" : "ফসল:"}
              </span>{" "}
              {f.crops}
            </p>

          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}
