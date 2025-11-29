"use client";

import { useEffect, useState } from "react";
import Loading from "./loading";

export default function WeatherWidget({
  districtName,
  lat,
  lon,
  onWeatherUpdate,
  onRiskUpdate,
}) {
  const [loading, setLoading] = useState(true);

  const fetchWeatherNow = async () => {
    try {
      setLoading(true);
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability&timezone=auto`;
      const res = await fetch(url);
      const data = await res.json();

      const nowHour = new Date().getHours();
      const weatherPack = {
        temp: data.hourly.temperature_2m[nowHour],
        humidity: data.hourly.relativehumidity_2m[nowHour],
        rain: data.hourly.precipitation_probability[nowHour],
      };

      onWeatherUpdate?.({ weather: weatherPack });

      const riskLevel = calculateRisk(weatherPack);
      onRiskUpdate?.({ risk: riskLevel });
    } catch (err) {
      console.error("Weather fetch error:", err);
      onWeatherUpdate?.({ weather: null });
      onRiskUpdate?.({ risk: null });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherNow();
  }, [lat, lon]);

  function calculateRisk({ temp, humidity, rain }) {
    if (rain > 70 || humidity > 85)
      return { level: "উচ্চ ঝুঁকি", color: "red" };
    if (rain > 40 || humidity > 65)
      return { level: "মধ্যম ঝুঁকি", color: "yellow" };
    return { level: "নিম্ন ঝুঁকি", color: "green" };
  }

  return (
    <div className="p-4 bg-gray-50 border rounded-lg w-96">
      <h3 className="font-semibold text-gray-700">{districtName} আবহাওয়া</h3>
      {loading ? (
       <Loading></Loading>
      ) : (
        <p className="text-gray-800">
          তাপমাত্রা: {onWeatherUpdate.temp}°C, আর্দ্রতা:{" "}
          {onWeatherUpdate.humidity}%, বৃষ্টি: {onWeatherUpdate.rain}%
        </p>
      )}
      <button
        onClick={fetchWeatherNow}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        রিফ্রেশ আবহাওয়া
      </button>
    </div>
  );
}
