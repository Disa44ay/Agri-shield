"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/app/LanguageContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useFirebaseUser } from "@/app/useFirebaseUser";

export default function CropRegistrationForm() {
  const { lang } = useLanguage();
  const { user } = useFirebaseUser();

  /* ---------------- BD TIME ISO FORMAT ---------------- */
  const getBdIso = () => {
    const now = new Date();
    const bd = new Date(now.getTime() + 6 * 3600000);
    return bd.toISOString(); // EXACT MATCH to backend format
  };

  /* ---------------- FORM STATE ---------------- */
  const [formData, setFormData] = useState({
    cropName: "",
    cropType: "", // will convert to array
    estimatedWeightKg: "",
    harvestDate: "",
    storage: {
      district: "",
      storageName: "",
      storageDate: "",
    },
  });

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("storage.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        storage: { ...formData.storage, [key]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      alert("User not logged in.");
      return;
    }

    /* AUTO FIELDS */
    const payload = {
      userEmail: user.email,
      cropName: formData.cropName,
      cropType: [formData.cropType], // backend requires ARRAY
      estimatedWeightKg: Number(formData.estimatedWeightKg),
      harvestDate: formData.harvestDate,

      storage: {
        district: formData.storage.district,
        storageName: formData.storage.storageName,
        storageDate: formData.storage.storageDate,
      },

      // Backend-required fields
      batchId: Math.floor(100000 + Math.random() * 900000), // Auto random batch ID
      farmerId: user.email.split("@")[0].toUpperCase(),     // Example: faisal@example.com → FAISAL
      status: "planted",                                    // Default
      createdAt: getBdIso(),
      updatedAt: getBdIso(),
    };

    try {
      const res = await fetch("https://agri-shield-w53f.onrender.com/api/crops/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to register crop");

      alert(lang === "bn" ? "ফসল সফলভাবে নিবন্ধিত হয়েছে!" : "Crop Registered Successfully!");

      // Reset form
      setFormData({
        cropName: "",
        cropType: "",
        estimatedWeightKg: "",
        harvestDate: "",
        storage: {
          district: "",
          storageName: "",
          storageDate: "",
        },
      });

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center p-4 bg-center">
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative backdrop-blur-md bg-white/10 border border-white/30 shadow-xl rounded-3xl p-8 w-full max-w-lg">

          <h1 className="text-3xl font-bold text-center text-white mb-6">
            {lang === "bn" ? "ফসল নিবন্ধন" : "Register Crop"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="cropName"
              value={formData.cropName}
              onChange={handleChange}
              placeholder={lang === "bn" ? "ফসলের নাম" : "Crop Name"}
              required
              className="w-full p-3 bg-white/20 text-white rounded-md border border-white/30"
            />

            <select
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white/20 text-white rounded-md border border-white/30"
            >
              <option value="" className="text-black">
                {lang === "bn" ? "ফসলের ধরন" : "Crop Type"}
              </option>
              <option value="Grain" className="text-black">Grain</option>
              <option value="Vegetable" className="text-black">Vegetable</option>
              <option value="Fruit" className="text-black">Fruit</option>
              <option value="Oil Seed" className="text-black">Oil Seed</option>
              <option value="Pulse" className="text-black">Pulse</option>
            </select>

            <input
              type="number"
              name="estimatedWeightKg"
              min="0"
              value={formData.estimatedWeightKg}
              onChange={handleChange}
              placeholder={lang === "bn" ? "ওজন (কেজি)" : "Estimated Weight (kg)"}
              required
              className="w-full p-3 bg-white/20 text-white rounded-md border border-white/30"
            />

            <input
              type="date"
              name="harvestDate"
              value={formData.harvestDate}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white/20 text-white rounded-md border border-white/30"
            />

            {/* STORAGE */}
            <h2 className="text-xl text-white font-semibold mt-4">
              {lang === "bn" ? "সংরক্ষণ তথ্য" : "Storage Info"}
            </h2>

            <input
              type="text"
              name="storage.district"
              value={formData.storage.district}
              onChange={handleChange}
              placeholder={lang === "bn" ? "জেলা" : "District"}
              className="w-full p-3 bg-white/20 text-white rounded-md border border-white/30"
            />

            <input
              type="text"
              name="storage.storageName"
              value={formData.storage.storageName}
              onChange={handleChange}
              placeholder={lang === "bn" ? "গুদামের নাম" : "Storage Name"}
              className="w-full p-3 bg-white/20 text-white rounded-md border border-white/30"
            />

            <input
              type="date"
              name="storage.storageDate"
              value={formData.storage.storageDate}
              onChange={handleChange}
              className="w-full p-3 bg-white/20 text-white rounded-md border border-white/30"
            />

            <button
              type="submit"
              className="w-full p-3 bg-[#8c562e] text-white font-semibold rounded-md"
            >
              {lang === "bn" ? "ফসল নিবন্ধন করুন" : "Register Crop"}
            </button>

          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
