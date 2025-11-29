"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts } from "../page";
import { useLanguage } from "@/app/LanguageContext";

export default function BlogDetailsPage() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const blog = blogPosts.find((b) => b.slug === slug);
  const { lang } = useLanguage();

  if (!blog)
    return (
      <p className="text-center mt-20 text-red-600 text-xl font-semibold">
        Blog not found
      </p>
    );

  return (
    <main className="min-h-screen px-4 py-16 flex justify-center items-start bg-transparent">
      {/* Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          max-w-4xl w-full bg-white/30 backdrop-blur-xl border border-white/20 
          rounded-3xl shadow-2xl p-6 sm:p-10 
          text-gray-900
        "
      >
        {/* Back Button */}
        <Link
          href="/blogs"
          className="inline-block px-4 py-2 mb-6 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
        >
          {lang === "bn" ? "পূর্বের পেজে ফিরে যান" : "Back to Blogs"}
        </Link>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-900 mb-6 text-center"
        >
          {blog.title[lang]}
        </motion.h1>

        {/* Image inside card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-60 sm:h-80 md:h-96 mb-8 overflow-hidden rounded-2xl shadow-lg"
        >
          <Image
            src={blog.img}
            alt={blog.title[lang]}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-green-800 text-lg leading-relaxed whitespace-pre-line"
        >
          {blog.content[lang]}
        </motion.p>
      </motion.div>
    </main>
  );
}
