"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getFarmersData } from "@/api/farmersDataApi";

// Full Bangladesh Division → District List
const divisionMap = {
  Dhaka: ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj",
    "Madaripur", "Manikganj", "Munshiganj", "Narayanganj",
    "Narsingdi", "Rajbari", "Shariatpur", "Tangail"
  ],
  Chattogram: ["Chattogram", "Cox’s Bazar", "Cumilla", "Brahmanbaria",
    "Feni", "Khagrachhari", "Bandarban", "Rangamati", "Noakhali", "Laxmipur"
  ],
  Rajshahi: ["Rajshahi", "Pabna", "Natore", "Bogura", "Naogaon",
    "Joypurhat", "Chapainawabganj", "Sirajganj"
  ],
  Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
  Khulna: ["Khulna", "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah",
    "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"
  ],
  Barishal: ["Barishal", "Bhola", "Jhalokathi", "Patuakhali",
    "Pirojpur", "Barguna"
  ],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  Rangpur: ["Rangpur", "Dinajpur", "Gaibandha", "Kurigram",
    "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"
  ]
};

export default function FarmersPage() {
  // Fetch with TanStack Query
  const { data: farmers = [], isLoading } = useQuery({
    queryKey: ["farmers"],
    queryFn: getFarmersData,
  });

  const [selectedCrop, setSelectedCrop] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Crop list auto-extracted
  const allCrops = [...new Set(farmers.flatMap((f) => f.crops))];

  // Filter logic
  const filteredFarmers = useMemo(() => {
    let list = [...farmers];

    if (selectedCrop) list = list.filter((f) => f.crops.includes(selectedCrop));
    if (division) list = list.filter((f) => f.division === division);
    if (district) list = list.filter((f) => f.district === district);
    if (harvestDate) list = list.filter((f) => f.harvestDate >= harvestDate);

    if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "cropCount") list.sort((a, b) => b.crops.length - a.crops.length);

    return list;
  }, [farmers, selectedCrop, division, district, harvestDate, sortBy]);


  if (isLoading) {
    return <p className="text-center text-white pt-20 text-xl">Loading farmers…</p>;
  }

  return (
    <div className="min-h-screen py-16 px-6 max-w-7xl mx-auto">

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center text-[#F4D9A3] drop-shadow-xl mb-12"
      >
        Our Farmers
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-10">

        {/* Filters Sidebar */}
        <aside className="w-full lg:w-72 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.4)] h-fit sticky top-24">

          <h2 className="text-xl font-semibold text-[#F4D9A3] mb-5">Filters</h2>

          {/* Crop */}
          <div className="mb-6">
            <label className="text-sm text-[#FFF7E6]">Crop</label>
            <select
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-black/40 border border-white/30 text-white"
            >
              <option value="">All</option>
              {allCrops.map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          {/* Division */}
          <div className="mb-6">
            <label className="text-sm text-[#FFF7E6]">Division</label>
            <select
              value={division}
              onChange={(e) => { setDivision(e.target.value); setDistrict(""); }}
              className="w-full mt-1 p-3 rounded-lg bg-black/40 border border-white/30 text-white"
            >
              <option value="">All</option>
              {Object.keys(divisionMap).map((div) => (
                <option key={div} value={div}>{div}</option>
              ))}
            </select>
          </div>

          {/* District */}
          {division && (
            <div className="mb-6">
              <label className="text-sm text-[#FFF7E6]">District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg bg-black/40 border border-white/30 text-white"
              >
                <option value="">All</option>
                {divisionMap[division].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          )}

          {/* Harvest Date */}
          <div className="mb-6">
            <label className="text-sm text-[#FFF7E6]">Harvest After</label>
            <input
              type="date"
              onChange={(e) => setHarvestDate(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-black/40 border border-white/30 text-white"
            />
          </div>

          {/* Sort */}
          <div>
            <label className="text-sm text-[#FFF7E6]">Sort By</label>
            <select
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-black/40 border border-white/30 text-white"
            >
              <option value="">Default</option>
              <option value="name">Name</option>
              <option value="cropCount">Crop Count</option>
            </select>
          </div>
        </aside>

        {/* Farmers Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {filteredFarmers.length === 0 && (
            <p className="text-center text-[#F4D9A3] text-lg col-span-full">
              No farmers found.
            </p>
          )}

          {filteredFarmers.map((f) => (
            <motion.div
              key={f.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 180, damping: 15 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.45)] p-7"
            >
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden bg-white/20 backdrop-blur-2xl shadow-xl">
                <Image src={f.avatar} width={112} height={112} alt={f.name} />
              </div>

              <h3 className="mt-4 text-center text-xl font-bold text-[#F4D9A3]">
                {f.name}
              </h3>

              <p className="text-center text-[#FFF7E6]/90 text-sm">
                📍 {f.district}, {f.division}
              </p>

              <p className="text-center text-[#FFF7E6] text-sm mt-3">
                🌱 <strong>Crops:</strong> {f.crops.join(", ")}
              </p>

              <p className="text-center text-[#FFF7E6]/80 text-sm mt-1">
                🌾 <strong>Harvest:</strong> {f.harvestDate}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
