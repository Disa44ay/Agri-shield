"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/app/LanguageContext";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

// APIs
import { getFarmersData } from "@/api/farmersDataApi";
import { getCropsData } from "@/api/cropsDataApi";
import { getAchievementsData } from "@/api/achievementsDataApi";

// ---------------- TRANSLATION MAPS ----------------
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

// ---------------- UTILITY ----------------
const translate = (value, map, lang) =>
  lang === "bn" ? map[value] || value : value;

export default function TopFarmersSection() {
  const { lang } = useLanguage();

  const text = {
    en: {
      title: "Top Farmers of the Month",
      subtitle: "Recognizing the most active and dedicated farmers",
      crops: "Crops",
    },
    bn: {
      title: "এই মাসের সেরা কৃষকরা",
      subtitle: "সবচেয়ে সক্রিয় এবং নিবেদিত কৃষকদের স্বীকৃতি",
      crops: "ফসল",
    },
  };

  // ---------------- FETCH ALL DATA ----------------
  const farmersQuery = useQuery({ queryKey: ["farmers"], queryFn: getFarmersData });
  const cropsQuery = useQuery({ queryKey: ["crops"], queryFn: getCropsData });
  const achievementsQuery = useQuery({
    queryKey: ["achievements"],
    queryFn: getAchievementsData,
  });

  if (farmersQuery.isLoading || cropsQuery.isLoading || achievementsQuery.isLoading)
    return <p className="text-center text-white py-20 text-xl">Loading…</p>;

  const farmers = farmersQuery.data;
  const crops = cropsQuery.data;
  const achievements = achievementsQuery.data;

  // ---------------- MERGE CROPS + ACHIEVEMENTS ----------------
  const farmersWithData = farmers.map((farmer) => {
    const farmerCrops = crops
      .filter((c) => c.userEmail === farmer.userEmail)
      .map((c) => c.cropName);

    const farmerAchievements =
      achievements.find((a) => a.userEmail === farmer.userEmail)?.achievements ||
      [];

    return {
      ...farmer,
      crops: farmerCrops,
      achievements: farmerAchievements,
      achievementCount: farmerAchievements.length,
    };
  });

  // ---------------- TOP 3 FARMERS ----------------
  const topFarmers = farmersWithData
    .sort((a, b) => b.achievementCount - a.achievementCount)
    .slice(0, 3);

  // ---------------- ANIMATIONS ----------------
  const container = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const cardAnim = {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <section
      className="
        w-full
        px-4 sm:px-6 lg:px-8
        py-16 sm:py-20 lg:py-24
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="
            text-3xl sm:text-4xl lg:text-5xl 
            font-extrabold 
            text-center 
            text-[#F4D9A3]
          "
        >
          {text[lang].title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1 }}
          className="
            mt-3 
            text-center 
            text-[#FFF7E6] 
            text-sm sm:text-base md:text-lg 
            max-w-2xl 
            mx-auto
          "
        >
          {text[lang].subtitle}
        </motion.p>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="
            mt-12 sm:mt-14 lg:mt-16 
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            gap-6 sm:gap-8 lg:gap-10
          "
        >
          {topFarmers.map((f, i) => (
            <motion.div
              key={i}
              variants={cardAnim}
              whileHover={{ scale: 1.05, y: -6 }}
              transition={{ duration: 0.25 }}
              className="
                relative 
                flex flex-col items-center 
                bg-white/10 
                backdrop-blur-2xl 
                border border-white/20 
                rounded-2xl sm:rounded-3xl 
                p-6 sm:p-7 lg:p-8 
                shadow-[0_10px_30px_rgba(0,0,0,0.55)]
              "
            >
              {/* Avatar */}
              <div
                className="
                  w-24 h-24 
                  sm:w-28 sm:h-28 
                  md:w-32 md:h-32
                  rounded-full 
                  overflow-hidden 
                  border border-white/30 
                  shadow-xl
                "
              >
                <Image
                  src={f.avatar}
                  alt={f.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Name */}
              <h3
                className="
                  mt-4 sm:mt-5 
                  text-xl sm:text-2xl 
                  font-bold 
                  text-[#F4D9A3] 
                  text-center
                "
              >
                {f.name}
              </h3>

              {/* Location */}
              <p
                className="
                  mt-1 
                  text-xs sm:text-sm md:text-base 
                  text-[#FFF7E6]/90 
                  text-center
                "
              >
                📍 {translate(f.district, districtBn, lang)},{" "}
                {translate(f.division, divisionBn, lang)}
              </p>

              {/* Crops */}
              <p
                className="
                  mt-3 
                  text-xs sm:text-sm md:text-base 
                  text-[#FFF7E6] 
                  text-center
                "
              >
                <span className="font-semibold">{text[lang].crops}:</span>{" "}
                {f.crops.length
                  ? f.crops.map((c) => translate(c, cropsBn, lang)).join(", ")
                  : lang === "bn"
                  ? "কোনো ফসল নেই"
                  : "N/A"}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
