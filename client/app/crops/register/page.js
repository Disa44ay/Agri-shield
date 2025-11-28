"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/app/LanguageContext";

export default function CropRegistrationForm() {
  const { lang } = useLanguage(); 

  const getBdTime = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const bdTime = new Date(utc + 6 * 3600000); // UTC+6
    const day = String(bdTime.getDate()).padStart(2, "0");
    const month = String(bdTime.getMonth() + 1).padStart(2, "0");
    const year = bdTime.getFullYear();
    const hours = String(bdTime.getHours()).padStart(2, "0");
    const minutes = String(bdTime.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  const [formData, setFormData] = useState({
    cropName: "",
    cropType: "",
    estimatedWeight: "",
    harvestDate: "",
    storage: {
      "district name": "",
      "location Name": "",
      "storage Date": "",
    },
    createdAtTime: getBdTime(),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setFormData((prev) => ({ ...prev, createdAtTime: getBdTime() }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Crop Registered:", formData);
    alert(
      lang === "bn"
        ? "ফসল সফলভাবে নিবন্ধিত হয়েছে!"
        : "Crop Registered Successfully!"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative backdrop-blur-md bg-white/10 border border-white/30 shadow-xl rounded-3xl p-8 w-full max-w-lg transition-transform duration-300 hover:scale-[1.03]">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          {lang === "bn" ? "ফসল নিবন্ধন" : "Register Crop"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="cropName"
            placeholder={lang === "bn" ? "ফসলের নাম" : "Crop Name"}
            value={formData.cropName}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white/20 text-white placeholder-white/70 rounded-md border border-white/30 focus:outline-none focus:ring-2"
          />

          <select
            name="cropType"
            value={formData.cropType}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white/20 text-white rounded-md border border-white/30 focus:outline-none focus:ring-2"
          >
            <option value="" className="text-black">
              {lang === "bn" ? "ফসলের ধরন" : "Crop Type"}
            </option>
            <option value="Grain" className="text-black">
              {lang === "bn" ? "ধান/ধানজাতীয়" : "Grain"}
            </option>
            <option value="Vegetable" className="text-black">
              {lang === "bn" ? "সবজি" : "Vegetable"}
            </option>
            <option value="Fruit" className="text-black">
              {lang === "bn" ? "ফল" : "Fruit"}
            </option>
            <option value="Oil Seed" className="text-black">
              {lang === "bn" ? "তেলবীজ" : "Oil Seed"}
            </option>
            <option value="Pulse" className="text-black">
              {lang === "bn" ? "ডাল" : "Pulse"}
            </option>
          </select>

          <input
            type="number"
            min="0"
            name="estimatedWeight"
            placeholder={
              lang === "bn" ? "ওজন (কেজি)" : "Estimated Weight (kg)"
            }
            value={formData.estimatedWeight}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white/20 text-white placeholder-white/70 rounded-md border border-white/30 focus:outline-none focus:ring-2"
          />

          <div>
            <label className="block mb-1 text-white">
              {lang === "bn" ? "ফসল তোলার তারিখ" : "Harvest Date"}
            </label>
            <input
              type="date"
              name="harvestDate"
              value={formData.harvestDate}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white/20 text-white rounded-md border border-white/30 focus:outline-none focus:ring-2"
            />
          </div>

          {/* Storage Info */}
          <div className="text-white space-y-2 mt-4">
            <h2 className="text-xl font-semibold mb-2">
              {lang === "bn" ? "সংরক্ষণের তথ্য" : "Storage Info"}
            </h2>

            <input
              type="text"
              name="storage.district name"
              placeholder={lang === "bn" ? "জেলা নাম" : "District Name"}
              value={formData.storage["district name"]}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white/20 text-white rounded-md border border-white/30 focus:outline-none focus:ring-2"
            />

            <input
              type="text"
              name="storage.location Name"
              placeholder={lang === "bn" ? "গুদামের নাম" : "Warehouse Name"}
              value={formData.storage["location Name"]}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white/20 text-white rounded-md border border-white/30 focus:outline-none focus:ring-2"
            />

            <input
              type="date"
              name="storage.storage Date"
              value={formData.storage["storage Date"]}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white/20 text-white rounded-md border border-white/30 focus:outline-none focus:ring-2"
            />

            {/* Live Registration Time */}
            <div className="text-white space-y-2 mt-4">
              <label>
                {lang === "bn"
                  ? "নিবন্ধনের সময় ও তারিখ"
                  : "Registration Time & Date"}
              </label>
              <input
                type="text"
                value={formData.createdAtTime}
                readOnly
                className="w-full p-3 bg-white/10 text-white rounded-md border border-white/20"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-[#8c562e] text-white font-semibold rounded-md hover:bg-[#a66b42] transition duration-300"
          >
            {lang === "bn" ? "ফসল নিবন্ধন করুন" : "Register Crop"}
          </button>
        </form>
      </div>
    </div>
  );
}
