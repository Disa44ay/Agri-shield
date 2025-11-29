"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/LanguageContext";

// Extended blog posts with detailed content
export const blogPosts = [
  {
    slug: "rice-planting-tips",
    title: { bn: "ধান চাষের সেরা সময়", en: "Best Time for Rice Planting" },
    summary: {
      bn: "যদি আপনি ধান চাষে সফল হতে চান, জমি প্রস্তুতি এবং বপনের সময় জানতে হবে।",
      en: "To succeed in rice farming, you must know land preparation and sowing time.",
    },
    content: {
      bn: "ধান চাষের জন্য সঠিক সময় নির্ধারণ করা খুবই গুরুত্বপূর্ণ। ...",
      en: "Determining the right time for rice planting is crucial. ...",
    },
    img: "/images/rice.png",
  },
  {
    slug: "organic-fertilizer",
    title: { bn: "প্রাকৃতিক সার ব্যবহার", en: "Using Organic Fertilizer" },
    summary: {
      bn: "রাসায়নিক সার কমিয়ে প্রাকৃতিক সার ব্যবহার কৃষিকে করে আরও টেকসই।",
      en: "Using organic fertilizers reduces chemical use and makes farming sustainable.",
    },
    content: {
      bn: "প্রাকৃতিক সার ব্যবহার করলে মাটি উর্বর থাকে এবং রাসায়নিকের প্রভাব কমে। ...",
      en: "Using organic fertilizers keeps soil fertile and reduces chemical impact. ...",
    },
    img: "/images/orange.png",
  },
  {
    slug: "climate-and-crops",
    title: { bn: "জলবায়ু এবং ফসল", en: "Climate and Crops" },
    summary: {
      bn: "বৃদ্ধিমান তাপমাত্রা ও বৃষ্টিপাত ফসলের উপর প্রভাব ফেলে।",
      en: "Rising temperatures and rainfall affect crop production significantly.",
    },
    content: {
      bn: "জলবায়ু পরিবর্তনের কারণে ফসলের উৎপাদন এবং রোগের ঝুঁকি বৃদ্ধি পায়। ...",
      en: "Climate change affects crop yield and increases the risk of pests and diseases. ...",
    },
    img: "/images/climate.png",
  },
  {
    slug: "pest-control",
    title: { bn: "পোকামাকড় ও রোগ নিয়ন্ত্রণ", en: "Pest and Disease Control" },
    summary: {
      bn: "ফসলের ক্ষতি প্রতিরোধ করতে পোকামাকড় ও রোগ নিয়ন্ত্রণ করা গুরুত্বপূর্ণ।",
      en: "Controlling pests and diseases is crucial to protect crops.",
    },
    content: {
      bn: "পোকামাকড় ও রোগ নিয়ন্ত্রণে প্রাকৃতিক পদ্ধতি যেমন Neem, Garlic Spray ব্যবহার করা যায়। ...",
      en: "For pest and disease control, natural methods like Neem or Garlic Spray can be effective. ...",
    },
    img: "/images/medicine.png",
  },
  {
    slug: "water-management",
    title: { bn: "জল ব্যবস্থাপনা", en: "Water Management" },
    summary: {
      bn: "সঠিকভাবে পানি ব্যবহার করলে ফসলের উৎপাদন বাড়ে।",
      en: "Proper water management increases crop yield.",
    },
    content: {
      bn: "সেচ এবং বৃষ্টি নির্ভরতার ভারসাম্য রাখলে ফসলের বৃদ্ধি এবং মান উন্নত হয়। ...",
      en: "Balancing irrigation and rainfall improves crop growth and quality. ...",
    },
    img: "/images/water.png",
  },
  {
    slug: "crop-rotation",
    title: { bn: "ফসল চক্র", en: "Crop Rotation" },
    summary: {
      bn: "ফসল চক্র মাটির পুষ্টি বজায় রাখে এবং রোগ কমায়।",
      en: "Crop rotation maintains soil nutrients and reduces diseases.",
    },
    content: {
      bn: "ফসল চক্র ব্যবহারে একই জমিতে একাধিক ধরণের ফসল উৎপাদন করা যায়, যা মাটির স্বাস্থ্য উন্নত করে। ...",
      en: "Crop rotation allows multiple crops in the same land, improving soil health. ...",
    },
    img: "/images/crop-rotation.png",
  },
];

// Language toggle button
function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();
  return (
    <button
      onClick={toggleLang}
      className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
    >
      {lang === "bn" ? "Switch to EN" : "বাংলায় দেখুন"}
    </button>
  );
}

export default function BlogsPage() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-10 py-20 bg-transparent text-gray-900">
      {/* Language Toggle */}
      <div className="flex justify-end mb-6">
        <LanguageToggle />
      </div>

      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-4 text-white"
      >
        {lang === "bn" ? "কৃষি ব্লগ" : "Farming Blogs"}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center text-white mb-12 text-base sm:text-lg"
      >
        {lang === "bn"
          ? "এখানে আপনি ফসল চাষ, সার ব্যবহারের পদ্ধতি, আবহাওয়া ও ফসলের যত্ন নিয়ে দরকারি তথ্য পেতে পারেন।"
          : "Here you can find useful information about farming techniques, fertilizers, climate, and crop care."}
      </motion.p>

      {/* Blog Grid with Glass Effect */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/30 backdrop-blur-md border border-white/20 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative w-full h-48 sm:h-56">
              <Image
                src={post.img}
                alt={post.title[lang]}
                fill
                className="object-cover"
                loading="eager"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-2">
                {post.title[lang]}
              </h2>
              <p className="text-white text-sm mb-4">{post.summary[lang]}</p>
              <Link
                href={`/blogs/${post.slug}`}
                className="inline-block px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-800 transition-colors duration-200"
              >
                {lang === "bn" ? "বিস্তারিত পড়ুন" : "Read More"}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
