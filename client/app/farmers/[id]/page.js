"use client";

import { useQuery } from "@tanstack/react-query";
import { getFarmersData } from "@/api/farmersDataApi";
import { getAchievementsData } from "@/api/achievementsDataApi";
import { getCropsData } from "@/api/cropsDataApi";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/LanguageContext";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

/* ---------------------------------------------
   BANGLA MAPS
--------------------------------------------- */
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
  Bronze: "ব্রোঞ্জ পুরস্কার",
  "Pest Protector": "পোকামাকড় প্রতিরোধক",
  "Sustainable Farmer": "টেকসই কৃষক",
};

const translate = (value, map, lang) =>
  lang === "bn" ? map[value] || value : value;

/* ---------------------------------------------
   PAGE
--------------------------------------------- */
export default function FarmerDetails() {
  const { id } = useParams();
  const { lang, setLang } = useLanguage();

  // 🔥 FIX EMAIL ENCODING ISSUE
  const emailParam = decodeURIComponent(id).trim().toLowerCase();

  const text = {
    en: {
      back: "← Back to Farmers",
      toggle: "বাংলা দেখুন",
      achievements: "Achievements",
      crops: "Registered Crops",
      noAchievements: "No achievements yet",
      noCrops: "No crops registered",
      harvest: "Harvest Date",
    },
    bn: {
      back: "← কৃষকের তালিকায় ফিরে যান",
      toggle: "See English",
      achievements: "অর্জনসমূহ",
      crops: "নিবন্ধিত ফসল",
      noAchievements: "এখনও কোনো অর্জন নেই",
      noCrops: "কোনো ফসল নিবন্ধিত নেই",
      harvest: "ফসল তোলার তারিখ",
    },
  };

  const t = text[lang];

  /* FETCH DATA */
  const farmersQuery = useQuery({
    queryKey: ["farmers"],
    queryFn: getFarmersData,
  });
  const achievementsQuery = useQuery({
    queryKey: ["achievements"],
    queryFn: getAchievementsData,
  });
  const cropsQuery = useQuery({ queryKey: ["crops"], queryFn: getCropsData });

  if (
    farmersQuery.isLoading ||
    achievementsQuery.isLoading ||
    cropsQuery.isLoading
  )
    return (
      <p className="text-center text-white pt-20 text-xl animate-pulse">
        Loading…
      </p>
    );

  const farmers = farmersQuery.data || [];

  // 🔥 MATCH FARMER BY NORMALIZED EMAIL
  const farmer = farmers.find(
    (f) => f.email?.trim().toLowerCase() === emailParam
  );

  if (!farmer)
    return (
      <p className="text-center text-white pt-20 text-xl">Farmer not found.</p>
    );

  const userEmail = farmer.email;

  // Achievement matching
  const userAchievements = achievementsQuery.data?.find(
    (a) => a.userEmail === userEmail
  ) || {
    achievements: [],
  };

  // Crop matching
  const userCrops =
    cropsQuery.data?.filter((c) => c.userEmail === userEmail) || [];

  const displayDivision = translate(farmer.division, divisionBn, lang);
  const displayDistrict = translate(farmer.district, districtBn, lang);

  return (
    <ProtectedRoute>
      <div className="min-h-screen pb-20">
        {/* Top bar */}
        <div className="flex justify-between items-center max-w-6xl mx-auto px-6 mt-8">
          <Link
            href="/farmers"
            className="text-[#F4D9A3] hover:text-white font-semibold"
          >
            {t.back}
          </Link>

          <button
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className="px-5 py-2 bg-[#A66A3A] text-white rounded-xl shadow"
          >
            {t.toggle}
          </button>
        </div>

        <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10 px-6">
          {/* LEFT CARD */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl text-center"
          >
            <div className="mx-auto rounded-full w-40 h-40 overflow-hidden border-4 border-white/30 shadow-lg">
              <Image
                src={farmer.avatar || "/images/default-farmer.png"}
                width={200}
                height={200}
                className="object-cover"
                alt={farmer.name}
              />
            </div>

            <h2 className="mt-5 text-3xl font-extrabold text-[#F4D9A3]">
              {lang === "bn" ? farmer.name_bn || farmer.name : farmer.name}
            </h2>

            <p className="text-white/70 mt-2 text-lg">
              📍 {displayDistrict}, {displayDivision}
            </p>

            <div className="w-full h-px bg-white/20 my-6" />

            <h3 className="text-xl font-semibold text-[#F4D9A3] mb-4">
              {t.achievements}
            </h3>

            {userAchievements.achievements.length === 0 ? (
              <p className="text-white/60">{t.noAchievements}</p>
            ) : (
              <div className="flex flex-wrap gap-3 justify-center">
                {userAchievements.achievements.map((a, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-yellow-600/20 border border-yellow-300/40 text-yellow-200 rounded-full shadow text-sm"
                  >
                    ⭐ {translate(a, achievementsBn, lang)}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* CROPS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10"
          >
            <h3 className="text-2xl font-bold text-[#F4D9A3] mb-8 text-center">
              {t.crops}
            </h3>

            {userCrops.length === 0 ? (
              <p className="text-center text-white/70">{t.noCrops}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {userCrops.map((crop, i) => (
                  <motion.div
                    key={crop._id || `${crop.cropName}-${i}`}
                    whileHover={{ scale: 1.03 }}
                    className="p-6 bg-white/10 rounded-2xl border border-white/20 shadow-lg backdrop-blur-lg"
                  >
                    <h4 className="text-xl font-bold text-[#F4D9A3] mb-2">
                      🌾 {translate(crop.cropName, cropsBn, lang)}
                    </h4>

                    <p className="text-white/80">
                      ⚖️ {crop.estimatedWeightKg} kg
                    </p>
                    <p className="text-white/80">
                      🗓 {t.harvest}: {crop.harvestDate}
                    </p>

                    <div className="mt-3 p-3 bg-black/20 rounded-xl">
                      <p className="text-white/60">
                        📍 {crop.storage?.district || "Unknown"}
                      </p>
                      <p className="text-white/60">
                        🏢 {crop.storage?.storageName || "No warehouse"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
