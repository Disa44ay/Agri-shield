"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/app/LanguageContext";
import Image from "next/image";
import { motion } from "framer-motion";

import { getFarmersData } from "@/api/farmersDataApi";
import { getCropsData } from "@/api/cropsDataApi";
import { getAchievementsData } from "@/api/achievementsDataApi";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";


export default function Dashboard() {
  /* ---------------- LANGUAGE TEXT ---------------- */
  const text = {
    en: {
      dashboard: "Dashboard",
      back: "← Back",
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
      toggle: "বাংলা দেখুন",
    },

    bn: {
      dashboard: "ড্যাশবোর্ড",
      back: "← ফিরে যান",
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
      toggle: "See English",
    },
  };

  const { lang, setLang } = useLanguage();
  const t = text[lang];

  /* ---------------- LOGGED IN USER ---------------- */
  const loggedEmail = "arman@gmail.com";

  /* ---------------- STATE HOOKS ---------------- */
  const [showProfileModal, setProfileModal] = useState(false);
  const [showCropModal, setCropModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);

  /* ---------------- FETCHING DATA ---------------- */
  const farmersQuery = useQuery({ queryKey: ["farmers"], queryFn: getFarmersData });
  const cropsQuery = useQuery({ queryKey: ["crops"], queryFn: getCropsData });
  const achievementsQuery = useQuery({ queryKey: ["achievements"], queryFn: getAchievementsData });

  const loading =
    farmersQuery.isLoading || cropsQuery.isLoading || achievementsQuery.isLoading;

  if (loading)
    return <p className="text-center text-white pt-20 text-xl">Loading…</p>;

  const farmer = farmersQuery.data.find((f) => f.userEmail === loggedEmail);
  const userCrops = cropsQuery.data.filter((c) => c.userEmail === loggedEmail);
  const userAchievements =
    achievementsQuery.data.find((a) => a.userEmail === loggedEmail) ||
    { achievements: [] };

  if (!farmer)
    return <p className="text-center text-white pt-20">No farmer found.</p>;

  /* ---------------- UI ---------------- */
  return (
    <ProtectedRoute>
        <div className="min-h-screen bg-black/20 px-4 sm:px-6 md:px-10 lg:px-16 py-10 max-w-[1600px] mx-auto">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F4D9A3]">
          {t.dashboard}
        </h1>
      </div>

      {/* -------- GRID LAYOUT RESPONSIVE -------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

        {/* ---------- PROFILE CARD ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            bg-white/10 border border-white/20 rounded-3xl 
            p-6 sm:p-8 backdrop-blur-xl
          "
        >
          <div className="flex flex-col items-center">

            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white/20 shadow">
              <Image src={farmer.avatar} width={200} height={200} alt={farmer.name} />
            </div>

            <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-[#F4D9A3] text-center">
              {farmer.name}
            </h2>

            <button
              onClick={() => setProfileModal(true)}
              className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto"
            >
              {t.editProfile}
            </button>
          </div>

          {/* Achievements */}
          <div className="mt-10">
            <h3 className="text-lg sm:text-xl text-[#F4D9A3] font-semibold mb-3">
              Achievements
            </h3>

            {userAchievements.achievements.length === 0 ? (
              <p className="text-white/60">{t.noAchievements}</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {userAchievements.achievements.map((a, i) => (
                  <span
                    key={i}
                    className="bg-yellow-600/40 border border-yellow-300/30 text-yellow-100 px-3 py-1 rounded-full text-sm"
                  >
                    ⭐ {a}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* ---------- CROPS SECTION ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-[#F4D9A3]">
              {t.yourCrops}
            </h2>

            <Link href="/crops/register" className="w-full sm:w-auto">
              <button className="px-5 py-2 w-full bg-green-600 text-white rounded-lg">
                {t.addCrop}
              </button>
            </Link>
          </div>

          {/* CROPS GRID RESPONSIVE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {userCrops.length === 0 && (
              <p className="text-white/70">{t.noCrops}</p>
            )}

            {userCrops.map((crop) => (
              <motion.div
                key={crop.cropId}
                whileHover={{ scale: 1.03 }}
                className="
                  p-5 sm:p-6 bg-white/10 backdrop-blur-lg 
                  rounded-2xl border border-white/20 shadow-lg
                "
              >
                <h3 className="text-xl font-bold text-[#F4D9A3] mb-2">
                  🌾 {crop.cropName}
                </h3>

                <p className="text-white/80">{t.type}: {crop.cropType}</p>
                <p className="text-white/80">{t.weight}: {crop.estimatedWeightKg} kg</p>
                <p className="text-white/80">{t.harvest}: {crop.harvestDate}</p>

                <div className="mt-4 flex gap-3 justify-between">
                  <button
                    onClick={() => {
                      setSelectedCrop(crop);
                      setCropModal(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
                  >
                    {t.edit}
                  </button>

                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg w-full">
                    {t.delete}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ---------- PROFILE EDIT MODAL ---------- */}
      {showProfileModal && (
        <Modal onClose={() => setProfileModal(false)} title={t.editProfile}>
          <ModalInput defaultValue={farmer.name} />
          <ModalInput defaultValue={farmer.district} />
          <ModalInput defaultValue={farmer.division} />

          <ModalButtons
            onCancel={() => setProfileModal(false)}
            updateText={t.update}
            cancelText={t.cancel}
          />
        </Modal>
      )}

      {/* ---------- CROP EDIT MODAL ---------- */}
      {showCropModal && selectedCrop && (
        <Modal onClose={() => setCropModal(false)} title={t.edit}>
          <ModalInput defaultValue={selectedCrop.cropName} />
          <ModalInput defaultValue={selectedCrop.cropType} />
          <ModalInput defaultValue={selectedCrop.estimatedWeightKg} type="number" />
          <ModalInput defaultValue={selectedCrop.harvestDate} type="date" />

          <ModalButtons
            onCancel={() => setCropModal(false)}
            updateText={t.update}
            cancelText={t.cancel}
          />
        </Modal>
      )}

    </div>
    </ProtectedRoute>
  );
}

/* -------------------- NICE REUSABLE INPUT -------------------- */
function ModalInput({ defaultValue, type = "text" }) {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      className="
        w-full p-3 rounded-lg text-white bg-white/20 
        border border-white/30 outline-none
        placeholder-white/50 focus:border-[#F4D9A3]
      "
    />
  );
}

/* -------------------- REUSABLE BUTTON ROW -------------------- */
function ModalButtons({ onCancel, updateText, cancelText }) {
  return (
    <div className="flex justify-end gap-4 mt-6">
      <button
        onClick={onCancel}
        className="px-4 py-2 bg-gray-600 rounded text-white"
      >
        {cancelText}
      </button>
      <button className="px-4 py-2 bg-green-600 rounded text-white">
        {updateText}
      </button>
    </div>
  );
}

/* -------------------- MODAL COMPONENT -------------------- */
function Modal({ children, title, onClose }) {
  return (
    <div className="fixed inset-0 z-[999] flex justify-center items-center p-4">

      {/* BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL BOX (responsive) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="
          relative w-full max-w-lg 
          bg-[rgba(255,255,255,0.08)] backdrop-blur-xl 
          border border-white/20 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]
          p-6 sm:p-8
        "
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/90 hover:text-red-400 text-xl"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-[#F4D9A3] mb-6">
          {title}
        </h2>

        <div className="space-y-4 text-white">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
