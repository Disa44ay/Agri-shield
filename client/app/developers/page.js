"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DevelopersPage() {
  const developers = [
    {
      name: "Md. Faisal Ahmed",
      id: "223001612",
      role: "UI Designer • Frontend Developer • Team Lead",
      img: "/images/Ahmed.svg",
    },
    {
      name: "Md. Shahidul Islam Sakib",
      id: "223001712",
      role: "Frontend Developer",
      img: "/images/shahidul.svg",
    },
    {
      name: "Abdullah Abu Sayeed",
      id: "223001112",
      role: "Backend Developer",
      img: "/images/Abdullah.svg",
    },
  ];

  return (
    <main className="min-h-screen w-full px-6 pt-28 pb-20 text-white">

      {/* PAGE TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-extrabold text-center text-[#F4D9A3]
                   drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]"
      >
        Meet the Developers
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto mt-4 text-center text-[#FFF7E6] text-lg 
                   drop-shadow"
      >
        The dedicated team behind AgriShield — transforming data into real impact.
      </motion.p>

      {/* GRID */}
      <div
        className="
          mt-16 grid 
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
          gap-10 max-w-7xl mx-auto
        "
      >
        {developers.map((dev, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -12, scale: 1.04 }}
            className="
              relative 
              bg-white/10 backdrop-blur-2xl 
              border border-white/20 
              rounded-3xl 
              p-10 
              shadow-[0_20px_60px_rgba(0,0,0,0.55)]
              hover:shadow-[0_30px_80px_rgba(0,0,0,0.75)]
              transition-all duration-300
            "
          >
            {/* Subtle gradient overlay */}
            <div className="
              absolute inset-0 rounded-3xl 
              bg-gradient-to-br from-white/10 via-transparent to-black/20 
              pointer-events-none
            "></div>

            {/* IMAGE — MUCH BIGGER SQUARE */}
            <div
              className="
                w-56 h-56               /* bigger image */
                sm:w-60 sm:h-60         /* slightly bigger on larger screens */
                rounded-2xl 
                overflow-hidden 
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
            <h2 className="mt-7 text-2xl font-bold text-[#F4D9A3] text-center drop-shadow-lg">
              {dev.name}
            </h2>

            {/* ID */}
            <p className="text-[#FFF7E6]/80 text-sm text-center mt-1">
              <span className="text-[#FFDDAE] font-semibold">ID:</span> {dev.id}
            </p>

            {/* ROLE */}
            <p className="mt-4 text-[#FFF7E6] text-base text-center leading-relaxed max-w-xs mx-auto">
              {dev.role}
            </p>

            {/* GLOW LINE */}
            <div className="mt-7 w-28 h-[3px] bg-gradient-to-r from-transparent via-[#F4D9A3] to-transparent mx-auto opacity-70"></div>
          </motion.div>
        ))}
      </div>

    </main>
  );
}
