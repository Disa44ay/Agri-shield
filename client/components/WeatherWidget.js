"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";

// Leaflet fix for default marker icon in Next.js
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function LocalRiskMap({ districtName, lat, lon }) {
  const [weather, setWeather] = useState(null);
  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [neighbors, setNeighbors] = useState([]);

  // ---------------------------
  // 1) Fetch Weather
  // ---------------------------
  useEffect(() => {
    async function fetchWeather() {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability&timezone=auto`;
        const res = await fetch(url);
        const data = await res.json();

        const temp = data.hourly.temperature_2m[0];
        const humidity = data.hourly.relativehumidity_2m[0];
        const rain = data.hourly.precipitation_probability[0];

        const weatherPack = { temp, humidity, rain };
        setWeather(weatherPack);
        setRisk(calculateRisk(weatherPack));

        // Generate mock neighbors
        setNeighbors(generateMockNeighbors(lat, lon));

        setLoading(false);
      } catch (err) {
        console.log("Weather Fetch Error:", err);
        setLoading(false);
      }
    }
    fetchWeather();
  }, [lat, lon]);

  // ---------------------------
  // 2) Spoilage Risk Logic
  // ---------------------------
  function calculateRisk({ temp, humidity, rain }) {
    if (rain > 70 || humidity > 85)
      return { level: "উচ্চ ঝুঁকি", color: "bg-red-600" };
    if (rain > 40 || humidity > 65)
      return { level: "মধ্যম ঝুঁকি", color: "bg-yellow-500" };
    return { level: "নিম্ন ঝুঁকি", color: "bg-green-600" };
  }

  // ---------------------------
  // 3) Generate Mock Neighbor Data
  // ---------------------------
  function generateMockNeighbors(lat, lon) {
    const neighbors = [];
    const riskLevels = ["নিম্ন ঝুঁকি", "মধ্যম ঝুঁকি", "উচ্চ ঝুঁকি"];
    const colors = ["green", "yellow", "red"];
    for (let i = 0; i < 12; i++) {
      neighbors.push({
        id: i,
        lat: lat + (Math.random() - 0.5) * 0.05, // small random offset
        lon: lon + (Math.random() - 0.5) * 0.05,
        crop: ["ধান", "পাট", "সবজি"][Math.floor(Math.random() * 3)],
        risk: riskLevels[Math.floor(Math.random() * 3)],
        color: colors[Math.floor(Math.random() * 3)],
        lastUpdate: "৫ মিনিট আগে",
      });
    }
    return neighbors;
  }

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto mt-4 p-4 bg-gray-200 rounded-lg">
        <p className="text-center text-gray-600">তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  // ---------------------------
  // 4) UI
  // ---------------------------
  return (
    <div className="w-full max-w-4xl mx-auto mt-4 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {districtName} জেলার স্থানীয় ঝুঁকি মানচিত্র
      </h2>

      {/* Risk Badge */}
      <div
        className={`text-white px-4 py-2 rounded-lg w-fit ${risk.color} mb-4`}
      >
        {risk.level}
      </div>

      {/* Map */}
      <MapContainer
        center={[lat, lon]}
        zoom={13}
        scrollWheelZoom
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Farmer's own location */}
        <Marker position={[lat, lon]}>
          <Popup>আপনার ক্ষেত্র</Popup>
        </Marker>

        {/* Neighbor Pins */}
        {neighbors.map((n) => (
          <CircleMarker
            key={n.id}
            center={[n.lat, n.lon]}
            pathOptions={{ color: n.color, fillColor: n.color }}
            radius={10}
          >
            <Popup>
              <div className="text-sm">
                ফসল: {n.crop} <br />
                ঝুঁকি: {n.risk} <br />
                সর্বশেষ আপডেট: {n.lastUpdate}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
