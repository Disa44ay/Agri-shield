"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/app/LanguageContext";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useFirebaseUser } from "@/app/useFirebaseUser";

import { getFarmersData } from "@/api/farmersDataApi";
import { getCropsData } from "@/api/cropsDataApi";
import { getAchievementsData } from "@/api/achievementsDataApi";

/* ---------------------- BN TRANSLATION MAPPINGS ---------------------- */
const divisionBn = {
  Dhaka: "ঢাকা",
  Chattogram: "চট্টগ্রাম",
  Rajshahi: "রাজশাহী",
  Mymensingh: "ময়মনসিংহ",
  Khulna: "খুলনা",
  Barishal: "বরিশাল",
  Sylhet: "সিলেট",
  Rangpur: "রংপুর",
};

const districtBn = {
  Dhaka: "ঢাকা",
  Faridpur: "ফরিদপুর",
  Gazipur: "গাজীপুর",
  Gopalganj: "গোপালগঞ্জ",
  Kishoreganj: "কিশোরগঞ্জ",
  Madaripur: "মাদারীপুর",
  Manikganj: "মানিকগঞ্জ",
  Munshiganj: "মুন্সিগঞ্জ",
  Narayanganj: "নারায়ণগঞ্জ",
  Narsingdi: "নরসিংদী",
  Rajbari: "রাজবাড়ি",
  Shariatpur: "শরীয়তপুর",
  Tangail: "টাঙ্গাইল",

  Chattogram: "চট্টগ্রাম",
  "Cox’s Bazar": "কক্সবাজার",
  Cumilla: "কুমিল্লা",
  Brahmanbaria: "ব্রাহ্মণবাড়িয়া",
  Feni: "ফেনী",
  Khagrachhari: "খাগড়াছড়ি",
  Bandarban: "বান্দরবান",
  Rangamati: "রাঙ্গামাটি",
  Noakhali: "নোয়াখালী",
  Laxmipur: "লক্ষ্মীপুর",

  Rajshahi: "রাজশাহী",
  Pabna: "পাবনা",
  Natore: "নাটোর",
  Bogura: "বগুড়া",
  Naogaon: "নওগাঁ",
  Joypurhat: "জয়পুরহাট",
  Chapainawabganj: "চাঁপাইনবাবগঞ্জ",
  Sirajganj: "সিরাজগঞ্জ",

  Mymensingh: "ময়মনসিংহ",
  Jamalpur: "জামালপুর",
  Netrokona: "নেত্রকোণা",
  Sherpur: "শেরপুর",

  Khulna: "খুলনা",
  Bagerhat: "বাগেরহাট",
  Chuadanga: "চুয়াডাঙ্গা",
  Jessore: "যশোর",
  Jhenaidah: "ঝিনাইদহ",
  Kushtia: "কুষ্টিয়া",
  Magura: "মাগুরা",
  Meherpur: "মেহেরপুর",
  Narail: "নড়াইল",
  Satkhira: "সাতক্ষীরা",

  Barishal: "বরিশাল",
  Bhola: "ভোলা",
  Jhalokathi: "ঝালকাঠি",
  Patuakhali: "পটুয়াখালী",
  Pirojpur: "পিরোজপুর",
  Barguna: "বরগুনা",

  Sylhet: "সিলেট",
  Moulvibazar: "মৌলভীবাজার",
  Habiganj: "হবিগঞ্জ",
  Sunamganj: "সুনামগঞ্জ",

  Rangpur: "রংপুর",
  Dinajpur: "দিনাজপুর",
  Gaibandha: "গাইবান্ধা",
  Kurigram: "কুড়িগ্রাম",
  Lalmonirhat: "লালমনিরহাট",
  Nilphamari: "নীলফামারী",
  Panchagarh: "পঞ্চগড়",
  Thakurgaon: "ঠাকুরগাঁও",
};

const cropsBn = {
  Mango: "আম",
  Wheat: "গম",
  Rice: "ধান",
  Vegetables: "সবজি",
  Jute: "পাট",
  Potato: "আলু",
  Tomato: "টমেটো",
  Tea: "চা",

  // New Bangladeshi Crops
  Onion: "পেঁয়াজ",
  Garlic: "রসুন",
  Ginger: "আদা",
  Chili: "মরিচ",
  Sugarcane: "আখ",
  Mustard: "সরিষা",
  Lentil: "মসুর ডাল",
  Chickpea: "ছোলা",
  Corn: "ভুট্টা",
  Banana: "কলা",
  Papaya: "পেপে",
  Pineapple: "আনারস",
  Coconut: "নারিকেল",
  BananaFlower: "মোচা",
  Eggplant: "বেগুন",
  Spinach: "পালং শাক",
  Pumpkin: "কুমড়া",
  Cucumber: "শসা",
  Watermelon: "তরমুজ",
  Sesame: "তিল",
  Soybean: "সয়াবিন",
  Turmeric: "হলুদ",
};


const achievementsBn = {
  "First Harvest of the Season": "মৌসুমের প্রথম ফসল সংগ্রহ",
  "Saved by a Brink": "শেষ মুহূর্তে ফসল রক্ষা",
  "Healthy Growth Guardian": "সুস্থ ফসল বৃদ্ধির অভিভাবক",
  "Bronze": "ব্রোঞ্জ পুরস্কার",
  "Pest Protector": "পোকামাকড় প্রতিরোধক",
  "Sustainable Farmer": "টেকসই কৃষক",
};
/* --------------------------------------------------------------------- */

export default function Dashboard() {
  const { lang } = useLanguage();
  const { user, loading: authLoading } = useFirebaseUser();

  const t = {
    en: {
      dashboard: "Dashboard",
      editProfile: "Edit Profile",
      yourCrops: "Your Crops",
      addCrop: "+ Add New Crop",
      type: "Type",
      weight: "Weight",
      harvest: "Harvest",
      noAchievements: "No achievements yet.",
      noCrops: "No crops added yet.",
      delete: "Delete",
      edit: "Edit",
      update: "Update",
      cancel: "Cancel",
    },
    bn: {
      dashboard: "ড্যাশবোর্ড",
      editProfile: "প্রোফাইল সম্পাদনা",
      yourCrops: "আপনার ফসল",
      addCrop: "+ নতুন ফসল যোগ করুন",
      type: "ধরন",
      weight: "ওজন",
      harvest: "ফসল তোলার তারিখ",
      noAchievements: "এখনও কোনো অর্জন নেই।",
      noCrops: "কোনো ফসল যোগ করা হয়নি।",
      delete: "মুছুন",
      edit: "সম্পাদনা",
      update: "আপডেট",
      cancel: "বাতিল",
    },
  }[lang];

  /* ---------------- TRANSLATION HELPERS ---------------- */
  const translateDivision = (d) =>
    lang === "bn" ? divisionBn[d] || d : d;

  const translateDistrict = (d) =>
    lang === "bn" ? districtBn[d] || d : d;

  const translateCrop = (c) =>
    lang === "bn" ? cropsBn[c] || c : c;

  const translateAchievement = (a) =>
    lang === "bn" ? achievementsBn[a] || a : a;

  /* ---------------- ALWAYS RUN HOOKS ---------------- */
  const farmersQuery = useQuery({
    queryKey: ["farmers"],
    queryFn: getFarmersData,
    enabled: !!user,
  });

  const cropsQuery = useQuery({
    queryKey: ["crops"],
    queryFn: getCropsData,
    enabled: !!user,
  });

  const achievementsQuery = useQuery({
    queryKey: ["achievements"],
    queryFn: getAchievementsData,
    enabled: !!user,
  });

  if (authLoading) {
    return (
      <p className="text-center text-white pt-20 text-xl">Loading…</p>
    );
  }

  const loggedEmail = "arman@gmail.com";


  /* ---------------- FILTER USER DATA ---------------- */
  const farmer = farmersQuery.data?.find((f) => f.userEmail === loggedEmail);
  const userCrops =
    cropsQuery.data?.filter((c) => c.userEmail === loggedEmail) || [];

  const userAchievements =
    achievementsQuery.data?.find((a) => a.userEmail === loggedEmail) || {
      achievements: [],
    };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black/20 px-4 sm:px-6 md:px-10 lg:px-16 py-10 max-w-[1600px] mx-auto">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-[#F4D9A3] mb-10">
          {t.dashboard}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ---------------- PROFILE CARD ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              rounded-3xl p-10 backdrop-blur-2xl
              bg-gradient-to-b from-[#ffffff1a] to-[#ffffff05]
              border border-white/20 shadow-xl
            "
          >
            <div className="flex flex-col items-center text-center">

              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#F4D9A3]/20 blur-2xl"></div>

                <Image
                  src={farmer?.avatar || "/images/Male-Farmer.svg"}
                  width={180}
                  height={180}
                  alt="Avatar"
                  className="relative rounded-full border-4 border-[#F4D9A3]/40"
                />
              </div>

              <h2 className="mt-6 text-3xl font-extrabold text-[#F4D9A3]">
                {farmer?.name}
              </h2>

              <p className="text-white/90 mt-1">{farmer?.mobile}</p>

              <p className="text-white/80 text-sm">
                <span className="text-[#F4D9A3] font-semibold">Division:</span>{" "}
                {translateDivision(farmer?.division)}
              </p>

              <p className="text-white/80 text-sm">
                <span className="text-[#F4D9A3] font-semibold">District:</span>{" "}
                {translateDistrict(farmer?.district)}
              </p>

              <p className="text-white/50 text-xs mt-1">
                Joined: {new Date(farmer?.createdAt).toLocaleDateString()}
              </p>

              <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg">
                {t.editProfile}
              </button>
            </div>

            <h3 className="mt-10 text-xl text-[#F4D9A3] font-semibold">
              Achievements
            </h3>

            {userAchievements.achievements.length === 0 ? (
              <p className="text-white/60">{t.noAchievements}</p>
            ) : (
              <div className="flex flex-wrap gap-3 mt-3">
                {userAchievements.achievements.map((a, i) => (
                  <span
                    key={i}
                    className="
                      px-4 py-1 rounded-full bg-yellow-600/30
                      border border-yellow-300/40 text-yellow-100 text-sm
                    "
                  >
                    ⭐ {translateAchievement(a)}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* ---------------- CROPS SECTION ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#F4D9A3]">
                {t.yourCrops}
              </h2>

              <Link href="/crops/register">
                <button className="px-5 py-2 bg-green-600 text-white rounded-lg">
                  {t.addCrop}
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {userCrops.length === 0 ? (
                <p className="text-white/70">{t.noCrops}</p>
              ) : (
                userCrops.map((crop) => (
                  <motion.div
                    key={crop.batchId}
                    whileHover={{ scale: 1.04 }}
                    className="
                      p-6 bg-white/10 rounded-2xl
                      border border-white/20 shadow-md
                      backdrop-blur-lg
                    "
                  >
                    <h3 className="text-xl font-bold text-[#F4D9A3] mb-2">
                      🌾 {crop.cropName}
                    </h3>

                    <p className="text-white/80">
                      {t.type}: {translateCrop(crop.cropType)}
                    </p>

                    <p className="text-white/80">
                      {t.weight}: {crop.estimatedWeightKg} kg
                    </p>

                    <p className="text-white/80">
                      {t.harvest}: {crop.harvestDate}
                    </p>

                    <div className="flex gap-3 mt-4">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full">
                        {t.edit}
                      </button>

                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg w-full">
                        {t.delete}
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
