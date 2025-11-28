"use client";

import { useQuery } from "@tanstack/react-query";
import { getFarmersData } from "@/api/farmersDataApi";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/LanguageContext";

// -------------------- Translation Maps --------------------
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


const translateCrops = (crops, lang) => {
  if (lang !== "bn") return crops;
  return crops.map((c) => cropsBn[c] || c);
};

const translateAchievements = (items, lang) => {
  if (lang !== "bn") return items;
  return items.map((a) => achievementsBn[a] || a);
};

// ----------------------------------------------------------

export default function FarmerDetails() {
  const { id } = useParams();
  const { lang, setLang } = useLanguage();

  const text = {
    en: {
      heading: "Farmer Details",
      crops: "Crops",
      division: "Division",
      district: "District",
      harvest: "Harvest Date",
      achievements: "Achievements",
      back: "← Back to Farmers",
      toggle: "বাংলা দেখুন",
    },
    bn: {
      heading: "কৃষকের বিস্তারিত",
      crops: "ফসল",
      division: "বিভাগ",
      district: "জেলা",
      harvest: "ফসল তোলার তারিখ",
      achievements: "অর্জনসমূহ",
      back: "← কৃষকের তালিকায় ফিরে যান",
      toggle: "See English",
    },
  };

  const t = text[lang] || text.bn;

  const { data: farmers = [], isLoading } = useQuery({
    queryKey: ["farmers"],
    queryFn: getFarmersData,
  });

  if (isLoading)
    return <p className="text-center text-white pt-20">Loading…</p>;

  const farmer = farmers.find((f) => f.id === Number(id));

  if (!farmer)
    return (
      <p className="text-center text-white pt-20 text-xl">
        Farmer not found.
      </p>
    );

  // Translated fields
  const displayDivision =
    lang === "bn"
      ? divisionBn[farmer.division] || farmer.division
      : farmer.division;

  const displayDistrict =
    lang === "bn"
      ? districtBn[farmer.district] || farmer.district
      : farmer.district;

  const displayCrops = translateCrops(farmer.crops, lang);
  const displayAchievements = translateAchievements(
    farmer.achievements || [],
    lang
  );

  return (
    <div className="min-h-screen py-16 px-6 max-w-3xl mx-auto">

      {/* Back + Toggle Row */}
      <div className="flex justify-between items-center mb-10">
        <a
          href="/farmers"
          className="text-[#F4D9A3] font-semibold text-lg hover:underline"
        >
          {t.back}
        </a>

        <button
          onClick={() => setLang(lang === "bn" ? "en" : "bn")}
          className="px-4 py-2 bg-[#A66A3A] text-white rounded-lg shadow hover:bg-[#8a542f]"
        >
          {t.toggle}
        </button>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-center text-[#F4D9A3] drop-shadow-xl mb-12"
      >
        {t.heading}
      </motion.h1>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          bg-white/10 backdrop-blur-2xl
          border border-white/20 
          rounded-3xl p-10 shadow-[0_8px_40px_rgba(0,0,0,0.55)]
          flex flex-col items-center
        "
      >
        {/* Avatar */}
        <div className="w-44 h-44 rounded-full overflow-hidden bg-white/20 shadow-xl">
          <Image
            src={farmer.avatar}
            width={230}
            height={230}
            alt={farmer.name}
            className="object-cover"
          />
        </div>

        {/* Name */}
        <h2 className="mt-6 text-3xl font-bold text-[#F4D9A3] tracking-wide">
          {lang === "bn" && farmer.name_bn ? farmer.name_bn : farmer.name}
        </h2>

        {/* Location */}
        <p className="text-[#FFF7E6]/90 mt-2 text-lg">
          📍 {displayDistrict}, {displayDivision}
        </p>

        <div className="w-full h-px bg-white/20 my-8" />

        {/* Info Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">

          <div className="p-5 bg-white/10 rounded-xl border border-white/10">
            <h3 className="text-[#F4D9A3] font-semibold text-xl">{t.crops}</h3>
            <p className="text-[#FFF7E6] mt-1 text-lg">
              {displayCrops.join(", ")}
            </p>
          </div>

          <div className="p-5 bg-white/10 rounded-xl border borderWhite/10">
            <h3 className="text-[#F4D9A3] font-semibold text-xl">{t.harvest}</h3>
            <p className="text-[#FFF7E6] mt-1 text-lg">{farmer.harvestDate}</p>
          </div>

        </div>

        {/* Achievements Section */}
        {displayAchievements.length > 0 && (
          <div className="mt-10 w-full p-6 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
            <h3 className="text-2xl font-semibold text-[#F4D9A3] mb-4 text-center">
              {t.achievements}
            </h3>

            <ul className="space-y-3 text-center">
              {displayAchievements.map((item, index) => (
                <li
                  key={index}
                  className="text-[#FFF7E6] bg-white/10 py-3 px-4 rounded-xl border border-white/10 shadow"
                >
                  ⭐ {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
}
