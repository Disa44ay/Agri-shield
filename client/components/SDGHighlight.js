"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SDGHighlight() {
  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="
          bg-white/10 backdrop-blur-xl 
          border border-white/20 
          rounded-3xl p-10 
          shadow-[0_10px_40px_rgba(0,0,0,0.45)]
          flex flex-col md:flex-row items-center gap-8
        "
      >
        {/* SDG Icon */}
        <div className="relative w-24 h-24">
          <Image
            src="/images/sdg12.png"        // add this icon in public/images 
            alt="SDG 12"
            fill
            className="object-contain drop-shadow-xl"
          />
        </div>

        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-extrabold text-[#F4D9A3] drop-shadow-lg">
            Linked to SDG 12 — Responsible Consumption & Production
          </h3>

          <p className="mt-3 text-[#FFF7E6] text-lg leading-relaxed max-w-2xl drop-shadow">
            Our mission aligns with <span className="font-semibold text-[#FFDDAE]">
            Target 12.3</span>, which focuses on cutting food losses across
            production and supply chains.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
