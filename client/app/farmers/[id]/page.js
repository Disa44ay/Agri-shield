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
// ---- Same Translation Maps ----
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
};

const achievementsBn = {
  "First Harvest of the Season": "মৌসুমের প্রথম ফসল সংগ্রহ",
  "Saved by a Brink": "শেষ মুহূর্তে ফসল রক্ষা",
  "Healthy Growth Guardian": "সুস্থ ফসল বৃদ্ধির অভিভাবক",
  "Bronze": "ব্রোঞ্জ পুরস্কার",
  "Pest Protector": "পোকামাকড় প্রতিরোধক",
  "Sustainable Farmer": "টেকসই কৃষক",
};

const translate = (value, map, lang) =>
  lang === "bn" ? map[value] || value : value;

export default function FarmerDetails() {
  const { id } = useParams();
  const { lang, setLang } = useLanguage();

  const text = {
    en: {
      heading: "Farmer Details",
      crops: "Registered Crops",
      achievements: "Achievements",
      harvest: "Harvest Date",
      back: "← Back to Farmers",
      toggle: "বাংলা দেখুন",
      noCrops: "No crops registered",
      noAchievements: "No achievements yet",
    },
    bn: {
      heading: "কৃষকের বিস্তারিত",
      crops: "নিবন্ধিত ফসল",
      achievements: "অর্জনসমূহ",
      harvest: "ফসল তোলার তারিখ",
      back: "← কৃষকের তালিকায় ফিরে যান",
      toggle: "See English",
      noCrops: "কোনো ফসল নিবন্ধিত নেই",
      noAchievements: "এখনও কোনো অর্জন নেই",
    },
  };
  const t = text[lang];

  // ---- API ----
  const farmersQuery = useQuery({ queryKey: ["farmers"], queryFn: getFarmersData });
  const achievementsQuery = useQuery({ queryKey: ["achievements"], queryFn: getAchievementsData });
  const cropsQuery = useQuery({ queryKey: ["crops"], queryFn: getCropsData });

  if (farmersQuery.isLoading || achievementsQuery.isLoading || cropsQuery.isLoading)
    return <p className="text-center text-white pt-20 text-xl animate-pulse">Loading…</p>;

  const farmer = farmersQuery.data.find((f) => f.id === Number(id));
  if (!farmer) return <p className="text-center text-white pt-20 text-xl">Farmer not found.</p>;

  const userAchievements =
    achievementsQuery.data.find((a) => a.userEmail === farmer.userEmail) || {};

  const userCrops = cropsQuery.data.filter(
    (c) => c.userEmail === farmer.userEmail
  );

  const displayDivision = translate(farmer.division, divisionBn, lang);
  const displayDistrict = translate(farmer.district, districtBn, lang);

  return (
    <ProtectedRoute>
        <div className="min-h-screen pb-20">

      {/* ---------------- TOP HEADER ---------------- */}
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8">
        <Link
          href="/farmers"
          className="text-[#F4D9A3] hover:text-white transition font-semibold text-base sm:text-lg"
        >
          {t.back}
        </Link>

        <button
          onClick={() => setLang(lang === "bn" ? "en" : "bn")}
          className="px-4 sm:px-5 py-2 bg-[#A66A3A] text-white font-semibold rounded-xl shadow hover:bg-[#8a542f] text-sm sm:text-base"
        >
          {t.toggle}
        </button>
      </div>

      {/* ---------------- PROFILE SECTION ---------------- */}
      <div className="
        max-w-6xl mx-auto mt-10 sm:mt-12 
        grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 
        px-4 sm:px-6
      ">

        {/* ---------------- LEFT PROFILE CARD ---------------- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="
            lg:col-span-1 
            bg-white/10 backdrop-blur-xl border border-white/20 
            rounded-3xl shadow-2xl 
            p-6 sm:p-8 text-center
          "
        >
          {/* Avatar */}
          <div className="
            mx-auto rounded-full overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.3)] 
            border-4 border-white/20 
            w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44
          ">
            <Image
              src={farmer.avatar}
              width={300}
              height={300}
              className="object-cover"
              alt={farmer.name}
            />
          </div>

          <h2 className="mt-5 text-2xl sm:text-3xl font-extrabold text-[#F4D9A3]">
            {lang === "bn" ? farmer.name_bn || farmer.name : farmer.name}
          </h2>

          <p className="text-white/80 mt-2 text-sm sm:text-lg">
            📍 {displayDistrict}, {displayDivision}
          </p>

          <div className="w-full h-px bg-white/20 my-6" />

          {/* Achievements */}
          <h3 className="text-lg sm:text-xl font-semibold text-[#F4D9A3] mb-4">
            {t.achievements}
          </h3>

          {!userAchievements.achievements ||
          userAchievements.achievements.length === 0 ? (
            <p className="text-white/60 text-sm sm:text-base">
              {t.noAchievements}
            </p>
          ) : (
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {userAchievements.achievements.map((a, i) => (
                <span
                  key={i}
                  className="
                    px-3 py-1 sm:px-4 sm:py-2 
                    text-xs sm:text-sm 
                    rounded-full 
                    bg-yellow-600/30 border border-yellow-300/40 text-yellow-200 shadow
                  "
                >
                  ⭐ {translate(a, achievementsBn, lang)}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* ---------------- RIGHT CROPS GRID ---------------- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="
            lg:col-span-2 
            bg-white/10 backdrop-blur-xl border border-white/20 
            rounded-3xl shadow-2xl 
            p-6 sm:p-10
          "
        >
          <h3 className="text-xl sm:text-2xl font-bold text-[#F4D9A3] mb-6 sm:mb-8 text-center">
            {t.crops}
          </h3>

          {userCrops.length === 0 ? (
            <p className="text-center text-white/80 text-sm sm:text-lg">
              {t.noCrops}
            </p>
          ) : (
            <div className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              xl:grid-cols-3 
              gap-6 sm:gap-8
            ">
              {userCrops.map((crop) => (
                <motion.div
                  key={crop.cropId}
                  whileHover={{ scale: 1.03 }}
                  className="
                    p-5 sm:p-6 
                    bg-white/10 backdrop-blur-lg 
                    rounded-2xl border border-white/20 
                    shadow-lg
                  "
                >
                  <h4 className="text-lg sm:text-xl font-bold text-[#F4D9A3] mb-2">
                    🌾 {translate(crop.cropName, cropsBn, lang)}
                  </h4>

                  <p className="text-white/80 text-sm sm:text-base">
                    🥗 {crop.cropType}
                  </p>

                  <p className="text-white/80 text-sm sm:text-base">
                    ⚖️ {crop.estimatedWeightKg} kg
                  </p>

                  <p className="text-white/80 text-sm sm:text-base">
                    🗓 {t.harvest}: {crop.harvestDate}
                  </p>

                  <div className="mt-3 p-3 bg-black/20 rounded-xl">
                    <p className="text-white/70 text-sm sm:text-base">
                      📍 {crop.storageDistrict}
                    </p>
                    <p className="text-white/70 text-sm sm:text-base">
                      🏢 {crop.storageWarehouse}
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
