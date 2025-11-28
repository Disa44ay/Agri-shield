"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-20">

      {/* FOOTER WRAPPER */}
      <div
        className="
          w-full 
          bg-[rgba(0,0,0,0.6)]
          backdrop-blur-xl 
          border-t border-white/10
          text-white 
          pt-12 pb-8
        "
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* -------------------------------- LOGO -------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h1 className="text-3xl font-extrabold text-[#F4D9A3]">
              Agri<span className="text-white">Shield</span>
            </h1>

            <p className="text-white/70 text-sm leading-6 max-w-xs">
              Empowering farmers with technology, insights & better market access.
            </p>
          </motion.div>

          {/* ------------------------------- QUICK LINKS ------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-[#F4D9A3]">Quick Links</h3>

            <ul className="text-white/70 space-y-2">
              <li><Link href="/farmers" className="hover:text-[#F4D9A3]">Farmers</Link></li>
              <li><Link href="/crops/register" className="hover:text-[#F4D9A3]">Register Crop</Link></li>
              <li><Link href="/weather" className="hover:text-[#F4D9A3]">Weather</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#F4D9A3]">Dashboard</Link></li>
            </ul>
          </motion.div>

          {/* ------------------------------- CONTACT INFO ------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-[#F4D9A3]">Contact</h3>

            <ul className="text-white/70 space-y-2 text-sm">
              <li>📍 Dhaka, Bangladesh</li>
              <li>📞 +880 1234-567890</li>
              <li>📧 support@agrishield.com</li>
            </ul>
          </motion.div>

          {/* ------------------------------- SOCIAL MEDIA ------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-[#F4D9A3]">Follow Us</h3>

            <div className="flex items-center gap-4 text-xl">
              <FaFacebook className="hover:text-[#F4D9A3] cursor-pointer transition" />
              <FaInstagram className="hover:text-[#F4D9A3] cursor-pointer transition" />
              <FaTwitter className="hover:text-[#F4D9A3] cursor-pointer transition" />
              <FaYoutube className="hover:text-[#F4D9A3] cursor-pointer transition" />
            </div>
          </motion.div>

        </div>

        {/* -------------------------------- COPYRIGHT -------------------------------- */}
        <div className="mt-10 text-center text-white/60 text-sm border-t border-white/10 pt-4">
          © {new Date().getFullYear()} AgriShield — All rights reserved.
        </div>

      </div>
    </footer>
  );
}
