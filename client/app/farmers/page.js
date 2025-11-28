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

/* -------------------------------------------------------------
   BANGLA TRANSLATION MAPS
------------------------------------------------------------- */
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

/* -------------------------------------------------------------
   DIVISION MAP
------------------------------------------------------------- */
const divisionMap = {
  Dhaka: [
    "Dhaka",
    "Faridpur",
    "Gazipur",
    "Gopalganj",
    "Kishoreganj",
    "Madaripur",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Rajbari",
    "Shariatpur",
    "Tangail",
  ],
  Chattogram: [
    "Chattogram",
    "Cox’s Bazar",
    "Cumilla",
    "Brahmanbaria",
    "Feni",
    "Khagrachhari",
    "Bandarban",
    "Rangamati",
    "Noakhali",
    "Laxmipur",
  ],
  Rajshahi: [
    "Rajshahi",
    "Pabna",
    "Natore",
    "Bogura",
    "Naogaon",
    "Joypurhat",
    "Chapainawabganj",
    "Sirajganj",
  ],
  Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
  Khulna: [
    "Khulna",
    "Bagerhat",
    "Chuadanga",
    "Jessore",
    "Jhenaidah",
    "Kushtia",
    "Magura",
    "Meherpur",
    "Narail",
    "Satkhira",
  ],
  Barishal: ["Barishal", "Bhola", "Jhalokathi", "Patuakhali", "Pirojpur", "Barguna"],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  Rangpur: [
    "Rangpur",
    "Dinajpur",
    "Gaibandha",
    "Kurigram",
    "Lalmonirhat",
    "Nilphamari",
    "Panchagarh",
    "Thakurgaon",
  ],
};

/* ======================================================================
   MAIN PAGE
====================================================================== */
export default function FarmersPage() {
  const { lang } = useLanguage();

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

  /* -------------------------------------------------------------
     FETCH DATA
  ------------------------------------------------------------- */
  const { data: farmersData = [] } = useQuery({
    queryKey: ["farmers"],
    queryFn: getFarmersData,
  });

  const { data: cropsData = [] } = useQuery({
    queryKey: ["crops"],
    queryFn: getCropsData,
  });

  const { data: achievementsData = [] } = useQuery({
    queryKey: ["achievements"],
    queryFn: getAchievementsData,
  });

  /* -------------------------------------------------------------
     FIX API STRUCTURES
  ------------------------------------------------------------- */
  const farmers = farmersData.users || farmersData || [];
  const crops = cropsData.crops || cropsData || [];
  const achievements = achievementsData.achievements || achievementsData || [];

  /* -------------------------------------------------------------
     FILTER + STATES
  ------------------------------------------------------------- */
  const [selectedCrop, setSelectedCrop] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 9;

  /* -------------------------------------------------------------
     ATTACH CROPS + ACHIEVEMENTS TO FARMERS
  ------------------------------------------------------------- */
  const farmersWithData = farmers.map((f) => ({
    ...f,
    crops: crops.filter((c) => c.userEmail === f.email),
    achievements: achievements.filter((a) => a.userEmail === f.email),
  }));

  /* -------------------------------------------------------------
     FILTER LOGIC
  ------------------------------------------------------------- */
  let filtered = [...farmersWithData];

  if (selectedCrop)
    filtered = filtered.filter((f) =>
      f.crops.some((c) => c.cropName === selectedCrop)
    );

  if (division) filtered = filtered.filter((f) => f.division === division);

  if (district) filtered = filtered.filter((f) => f.district === district);

  if (harvestDate)
    filtered = filtered.filter((f) =>
      f.crops.some((c) => c.harvestDate >= harvestDate)
    );

  if (sortBy === "name")
    filtered.sort((a, b) => a.name.localeCompare(b.name));

  if (sortBy === "cropCount")
    filtered.sort((a, b) => b.crops.length - a.crops.length);

  /* -------------------------------------------------------------
     PAGINATION
  ------------------------------------------------------------- */
  const totalPages = Math.ceil(filtered.length / perPage);
  const currentFarmers = filtered.slice((page - 1) * perPage, page * perPage);

  const translate = (value, map) =>
    lang === "bn" ? map[value] || value : value;

  /* -------------------------------------------------------------
     UI
  ------------------------------------------------------------- */
  return (
    <div className="min-h-screen py-12 px-6 max-w-7xl mx-auto">

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl text-center font-bold text-[#F4D9A3] mb-10"
      >
        {t.heading}
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-10">


        {/* FILTER SIDEBAR */}
        <aside className="w-full lg:w-72 bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-6">

          <h2 className="text-xl font-semibold text-[#F4D9A3] mb-5">{t.filters}</h2>

          {/* Crop */}
          <label className="text-sm text-[#FFF7E6]">{t.crop}</label>
          <select
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full p-3 bg-black/40 border border-white/20 text-white rounded-lg mt-1"
          >
            <option value="">{t.default}</option>
            {[...new Set(crops.map((c) => c.cropName))].map((name) => (
              <option key={name} value={name}>
                {translate(name, cropsBn)}
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
              }}
              className="w-full p-3 bg-black/40 border border-white/20 text-white rounded-lg mt-1"
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
                className="w-full p-3 bg-black/40 border border-white/20 text-white rounded-lg mt-1"
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

          {/* Harvest */}
          <div className="mt-5">
            <label className="text-sm text-[#FFF7E6]">{t.harvest}</label>
            <input
              type="date"
              onChange={(e) => setHarvestDate(e.target.value)}
              className="w-full p-3 bg-black/40 border border-white/20 text-white rounded-lg mt-1"
            />
          </div>

          {/* Sort */}
          <div className="mt-5">
            <label className="text-sm text-[#FFF7E6]">{t.sort}</label>
            <select
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 bg-black/40 border border-white/20 text-white rounded-lg mt-1"
            >
              <option value="">{t.default}</option>
              <option value="name">{t.name}</option>
              <option value="cropCount">{t.cropCount}</option>
            </select>
          </div>
        </aside>

        {/* FARMER GRID */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentFarmers.map((f) => (
            <Link key={f._id} href={`/farmers/${f.email}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-lg cursor-pointer"
              >
                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden bg-white/20 shadow-md">
                  <Image
                    src={f.picture || "/user.svg"}
                    width={112}
                    height={112}
                    alt={f.name}
                    className="object-cover"
                  />
                </div>

                <h3 className="text-center text-xl font-bold text-[#F4D9A3] mt-3">
                  {f.name}
                </h3>

                <p className="text-center text-white/80 text-sm">
                  📍 {translate(f.district, districtBn)}, {translate(f.division, divisionBn)}
                </p>

                <p className="text-center text-white mt-2">
                  🌱 {f.crops.length > 0
                    ? f.crops.map((c) => translate(c.cropName, cropsBn)).join(", ")
                    : t.noCrop}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-5 px-6 py-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">

            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-[#A66A3A] disabled:bg-gray-600 text-white rounded-lg"
            >
              ← {t.prev}
            </button>

            <p className="text-[#F4D9A3] font-bold">
              {t.page} {page} / {totalPages}
            </p>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-[#A66A3A] disabled:bg-gray-600 text-white rounded-lg"
            >
              {t.next} →
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
