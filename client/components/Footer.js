"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useLanguage } from "@/app/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();

  // ---------------- TEXT TRANSLATION ----------------
  const text = {
    en: {
      about: "Empowering farmers with technology, insights & better market access.",
      quickLinks: "Quick Links",
      farmers: "Farmers",
      registerCrop: "Register Crop",
      weather: "Weather",
      dashboard: "Dashboard",
      contact: "Contact",
      address: "Chittagong, Bangladesh",
      phone: "+880 1********",
      email: "support@agrishield.com",
      developers: "Meet the Developers",
      follow: "Follow Us",
      copyright: "All rights reserved.",
    },

    bn: {
      about: "প্রযুক্তি, তথ্য ও উন্নত বাজার সংযোগের মাধ্যমে কৃষকদের ক্ষমতায়ন।",
      quickLinks: "দ্রুত লিংক",
      farmers: "কৃষকদের তালিকা",
      registerCrop: "ফসল নিবন্ধন",
      weather: "আবহাওয়া",
      dashboard: "ড্যাশবোর্ড",
      contact: "যোগাযোগ",
      address: "চট্টগ্রাম, বাংলাদেশ",
      phone: "+৮৮০ ১********",
      email: "support@agrishield.com",
      developers: "ডেভেলপারদের সাথে পরিচিত হোন",
      follow: "আমাদের অনুসরণ করুন",
      copyright: "সর্বস্বত্ব সংরক্ষিত।",
    }
  };

  const t = text[lang];

  return (
    <footer className="">
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

          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h1 className="text-3xl font-extrabold text-[#F4D9A3]">
              Agri<span className="text-white">Shield</span>
            </h1>

            <p className="text-white/70 text-sm leading-6 max-w-xs">
              {t.about}
            </p>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-[#F4D9A3]">
              {t.quickLinks}
            </h3>

            <ul className="text-white/70 space-y-2">
              <li><Link href="/farmers" className="hover:text-[#F4D9A3]">{t.farmers}</Link></li>
              <li><Link href="/crops/register" className="hover:text-[#F4D9A3]">{t.registerCrop}</Link></li>
              <li><Link href="/weather" className="hover:text-[#F4D9A3]">{t.weather}</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#F4D9A3]">{t.dashboard}</Link></li>
            </ul>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-[#F4D9A3]">{t.contact}</h3>

            <ul className="text-white/70 space-y-2 text-sm">
              <li>📍 {t.address}</li>
              <li>📞 {t.phone}</li>
              <li>📧 {t.email}</li>
              <li>
                <Link href="/developers" className="hover:text-[#F4D9A3] font-bold">
                  {t.developers}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* SOCIAL MEDIA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-[#F4D9A3]">{t.follow}</h3>

            <div className="flex items-center gap-4 text-xl">
              <FaFacebook className="hover:text-[#F4D9A3] cursor-pointer transition" />
              <FaInstagram className="hover:text-[#F4D9A3] cursor-pointer transition" />
              <FaTwitter className="hover:text-[#F4D9A3] cursor-pointer transition" />
              <FaYoutube className="hover:text-[#F4D9A3] cursor-pointer transition" />
            </div>
          </motion.div>

        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 text-center text-white/60 text-sm border-t border-white/10 pt-4">
          © {new Date().getFullYear()} AgriShield — {t.copyright}
        </div>

      </div>
    </footer>
  );
}
