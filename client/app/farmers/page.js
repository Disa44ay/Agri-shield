"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { getFarmersData } from "@/api/farmersDataApi";
import { getCropsData } from "@/api/cropsDataApi";
import { getAchievementsData } from "@/api/achievementsDataApi";
import { useLanguage } from "@/app/LanguageContext";

// ---------------------------------------------------------------
// TRANSLATION TABLES
// ---------------------------------------------------------------
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

// ---------------- Division Map ----------------
const divisionMap = {
  Dhaka: ["Dhaka","Faridpur","Gazipur","Gopalganj","Kishoreganj","Madaripur","Manikganj","Munshiganj","Narayanganj","Narsingdi","Rajbari","Shariatpur","Tangail"],
  Chattogram: ["Chattogram","Cox’s Bazar","Cumilla","Brahmanbaria","Feni","Khagrachhari","Bandarban","Rangamati","Noakhali","Laxmipur"],
  Rajshahi: ["Rajshahi","Pabna","Natore","Bogura","Naogaon","Joypurhat","Chapainawabganj","Sirajganj"],
  Mymensingh: ["Mymensingh","Jamalpur","Netrokona","Sherpur"],
  Khulna: ["Khulna","Bagerhat","Chuadanga","Jessore","Jhenaidah","Kushtia","Magura","Meherpur","Narail","Satkhira"],
  Barishal: ["Barishal","Bhola","Jhalokathi","Patuakhali","Pirojpur","Barguna"],
  Sylhet: ["Sylhet","Moulvibazar","Habiganj","Sunamganj"],
  Rangpur: ["Rangpur","Dinajpur","Gaibandha","Kurigram","Lalmonirhat","Nilphamari","Panchagarh","Thakurgaon"],
};
// ---------------------------------------------------------------

export default function FarmersPage() {
  const { lang } = useLanguage();

  // UI TEXT
  const ui = {
    en: {
      heading: "Our Farmers",
      filters: "Filters",
      crop: "Crop",
      division: "Division",
      district: "District",
      harvest: "Harvest Date",
      sort: "Sort By",
      default: "Default",
      name: "Name",
      cropCount: "Crop Count",
      prev: "Prev",
      next: "Next",
      page: "Page",
      noCrop: "No crops registered",
    },
    bn: {
      heading: "আমাদের কৃষকরা",
      filters: "ফিল্টার",
      crop: "ফসল",
      division: "বিভাগ",
      district: "জেলা",
      harvest: "ফসল তোলার তারিখ",
      sort: "সাজান",
      default: "ডিফল্ট",
      name: "নাম",
      cropCount: "ফসলের সংখ্যা",
      prev: "আগের",
      next: "পরের",
      page: "পৃষ্ঠা",
      noCrop: "কোনো ফসল নিবন্ধিত নেই",
    },
  };

  const t = ui[lang];

  // Fetch all data
  const { data: farmers = [], isLoading } = useQuery({
    queryKey: ["farmers"],
    queryFn: getFarmersData,
  });

  const { data: crops = [] } = useQuery({
    queryKey: ["crops"],
    queryFn: getCropsData,
  });

  const { data: achievements = [] } = useQuery({
    queryKey: ["achievements"],
    queryFn: getAchievementsData,
  });

  // Component UI states
  const [selectedCrop, setSelectedCrop] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const farmersPerPage = 9;

  // Build crop list (all unique cropNames from crops.json)
  const allCrops = [...new Set(crops.map((c) => c.cropName))];

  // ---------------------------------------------------------------
  // JOIN DATA: attach crops + achievements to farmer
  // ---------------------------------------------------------------
  const farmersWithData = farmers.map((farmer) => {
    const farmerCrops = crops.filter((c) => c.userEmail === farmer.userEmail);
    const farmerAchievements = achievements.filter(
      (a) => a.userEmail === farmer.userEmail
    );

    return {
      ...farmer,
      crops: farmerCrops,
      achievements: farmerAchievements,
    };
  });

  // ---------------------------------------------------------------
  // FILTERING LOGIC
  // ---------------------------------------------------------------
  const filteredFarmers = (() => {
    let list = [...farmersWithData];

    if (selectedCrop)
      list = list.filter((f) =>
        f.crops.some((c) => c.cropName === selectedCrop)
      );

    if (division) list = list.filter((f) => f.division === division);

    if (district) list = list.filter((f) => f.district === district);

    if (harvestDate)
      list = list.filter((f) =>
        f.crops.some((c) => c.harvestDate >= harvestDate)
      );

    if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));

    if (sortBy === "cropCount")
      list.sort((a, b) => b.crops.length - a.crops.length);

    return list;
  })();

  // ---------------------------------------------------------------
  // PAGINATION
  // ---------------------------------------------------------------
  const totalPages = Math.ceil(filteredFarmers.length / farmersPerPage);
  const currentFarmers = filteredFarmers.slice(
    (currentPage - 1) * farmersPerPage,
    currentPage * farmersPerPage
  );

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const translate = (value, map) =>
    lang === "bn" ? map[value] || value : value;

  if (isLoading)
    return <p className="text-center text-white pt-20 text-xl">Loading…</p>;

  // ---------------------------------------------------------------
  // RENDER UI
  // ---------------------------------------------------------------
  return (
    <div className="min-h-screen py-12 px-6 max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-5xl font-bold text-center text-[#F4D9A3] mb-10"
      >
        {t.heading}
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* -----------------------------------------------------
             SIDEBAR FILTERS
        ----------------------------------------------------- */}
        <aside className="w-full lg:w-72 bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-6 h-fit sticky lg:top-24">
          <h2 className="text-xl font-semibold text-[#F4D9A3] mb-5">
            {t.filters}
          </h2>

          {/* Crop */}
          <label className="text-sm text-[#FFF7E6]">{t.crop}</label>
          <select
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full p-3 mt-1 rounded-lg bg-black/40 border border-white/20 text-white"
          >
            <option value="">{t.default}</option>
            {allCrops.map((c) => (
              <option key={c} value={c}>
                {translate(c, cropsBn)}
              </option>
            ))}
          </select>

          {/* Division */}
          <div className="mt-5">
            <label className="text-sm text-[#FFF7E6]">{t.division}</label>
            <select
              value={division}
              onChange={(e) => {
                setDivision(e.target.value);
                setDistrict("");
                setCurrentPage(1);
              }}
              className="w-full p-3 mt-1 rounded-lg bg-black/40 border border-white/20 text-white"
            >
              <option value="">{t.default}</option>
              {Object.keys(divisionMap).map((d) => (
                <option key={d} value={d}>
                  {translate(d, divisionBn)}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          {division && (
            <div className="mt-5">
              <label className="text-sm text-[#FFF7E6]">{t.district}</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-3 mt-1 rounded-lg bg-black/40 border border-white/20 text-white"
              >
                <option value="">{t.default}</option>
                {divisionMap[division].map((dist) => (
                  <option key={dist} value={dist}>
                    {translate(dist, districtBn)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Harvest Date */}
          <div className="mt-5">
            <label className="text-sm text-[#FFF7E6]">{t.harvest}</label>
            <input
              type="date"
              onChange={(e) => setHarvestDate(e.target.value)}
              className="w-full p-3 mt-1 rounded-lg bg-black/40 border border-white/20 text-white"
            />
          </div>

          {/* Sort */}
          <div className="mt-5">
            <label className="text-sm text-[#FFF7E6]">{t.sort}</label>
            <select
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 mt-1 rounded-lg bg-black/40 border border-white/20 text-white"
            >
              <option value="">{t.default}</option>
              <option value="name">{t.name}</option>
              <option value="cropCount">{t.cropCount}</option>
            </select>
          </div>
        </aside>

        {/* -----------------------------------------------------
             FARMERS GRID
        ----------------------------------------------------- */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentFarmers.map((f) => {
            const cropList =
              f.crops.length > 0
                ? f.crops.map((c) => translate(c.cropName, cropsBn)).join(", ")
                : t.noCrop;

            return (
              <Link key={f.id} href={`/farmers/${f.id}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-lg hover:shadow-xl transition"
                >
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden bg-white/20 shadow-md">
                    <Image src={f.avatar} width={112} height={112} alt={f.name} />
                  </div>

                  <h3 className="text-center text-xl font-bold text-[#F4D9A3] mt-3">
                    {f.name}
                  </h3>

                  <p className="text-center text-white/80 text-sm">
                    📍 {translate(f.district, districtBn)},{" "}
                    {translate(f.division, divisionBn)}
                  </p>

                  <p className="text-center text-white mt-2">🌱 {cropList}</p>

                  {f.crops[0] && (
                    <p className="text-center text-white/80 mt-1">
                      🌾 {f.crops[0].harvestDate}
                    </p>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* -----------------------------------------------------
           PAGINATION
      ----------------------------------------------------- */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-5 px-6 py-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg text-white font-semibold bg-[#A66A3A] hover:bg-[#8b542f] disabled:bg-gray-600"
            >
              ← {t.prev}
            </button>

            <p className="text-[#F4D9A3] font-bold">
              {t.page} {currentPage} / {totalPages}
            </p>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg text-white font-semibold bg-[#A66A3A] hover:bg-[#8b542f] disabled:bg-gray-600"
            >
              {t.next} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
