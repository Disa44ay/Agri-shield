"use client";

import { useState } from "react";

export default function CropRegistrationForm() {
  const getCtgTime = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 6 * 3600000).toISOString(); // UTC+6 for Chattogram
  };

  const [formData, setFormData] = useState({
    cropName: "",
    cropType: "",
    estimatedWeight: "",
    harvestDate: "",
    storage: {
      "division name": "Chattogram",
      "district name": "Cumilla",
      "location Name": "Kotbari Storage Unit",
      "storage Date": "",
    },
    createdAtTime: getCtgTime(),
  });

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
    alert("Crop Registered Successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[url('/farmer-bg.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative backdrop-blur-md bg-white/10 border border-white/30 shadow-xl rounded-3xl p-8 w-full max-w-lg transition-transform duration-300 hover:scale-[1.03]">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Register Crop
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="cropName"
            placeholder="Crop Name"
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
              Crop Type
            </option>
            <option value="Grain" className="text-black">
              Grain
            </option>
            <option value="Vegetable" className="text-black">
              Vegetable
            </option>
            <option value="Fruit" className="text-black">
              Fruit
            </option>
            <option value="Oil Seed" className="text-black">
              Oil Seed
            </option>
            <option value="Pulse" className="text-black">
              Pulse
            </option>
          </select>

          <input
            type="number"
            min="0"
            name="estimatedWeight"
            placeholder="Estimated Weight (kg)"
            value={formData.estimatedWeight}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white/20 text-white placeholder-white/70 rounded-md border border-white/30 focus:outline-none focus:ring-2"
          />

          <div>
            <label className="block mb-1 text-white">Harvest Date</label>
            <input
              type="date"
              name="harvestDate"
              value={formData.harvestDate}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white/20 text-white rounded-md border border-white/30 focus:outline-none focus:ring-2"
            />
          </div>

          {/* Storage Info Section */}
          <div className="text-white space-y-2 mt-4">
            <h2 className="text-xl font-semibold mb-2">Storage Info</h2>

            <div>
              <input
                type="text"
                name="storage.district name"
                placeholder="District Name"
                value={formData.storage["district name"]}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/20 text-white rounded-md border border-white/30 focus:outline-none focus:ring-2"
              />
            </div>

            <div>
              <input
                type="text"
                name="storage.location Name"
                placeholder="Warehouse Name"
                value={formData.storage["location Name"]}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/20 text-white rounded-md border border-white/30 focus:outline-none focus:ring-2"
              />
            </div>

            <div>
              <input
                type="date"
                name="storage.storage Date"
                value={formData.storage["storage Date"]}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/20 text-white rounded-md border border-white/30 focus:outline-none focus:ring-2"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-[#8c562e] text-white font-semibold rounded-md hover:bg-[#a66b42] transition duration-300"
          >
            Register Crop
          </button>
        </form>
      </div>
    </div>
  );
}
