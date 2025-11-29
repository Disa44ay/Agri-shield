"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/app/LanguageContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MapComponent from "@/components/MapComponent";
import VoiceAssistant from "@/components/VoiceAssistant";
import WeatherWidget from "@/components/WeatherWidget";
import "leaflet/dist/leaflet.css";

const getWeatherData = async (district) => {
  const apiKey = "4e2b41473b83f744ee4afc80dae9aac2";
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${district},BD&units=metric&appid=${apiKey}`;

  const res = await fetch(weatherApiUrl);
  const data = await res.json();
  return data;
};

const extractNextFiveDays = (list) => {
  const daily = {};
  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!daily[date]) daily[date] = item;
  });
  return Object.values(daily).slice(1, 6);
};

const getCropData = async (userEmail) => {
  try {
    const res = await fetch("https://agri-shield-w53f.onrender.com/api/crops");
    const data = await res.json();
    const cropsList = data?.crops || data;
    const userCrops = cropsList.filter(
      (c) => c.userEmail.toLowerCase() === userEmail.toLowerCase()
    );
    return userCrops || [];
  } catch (err) {
    console.log("Crop fetch error:", err);
    return [];
  }
};

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [district, setDistrict] = useState("Rajshahi");
  const [userEmail, setUserEmail] = useState(null);
  const [crops, setCrops] = useState([]);
  const { lang } = useLanguage();

  const lat = 23.8103; // ensure this exists
  const lon = 90.4125; // ensure this exists

  const [weather, setWeather] = useState(null);
  const [risk, setRisk] = useState(null);
  // Get logged-in user email
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user?.email) setUserEmail(user.email);
    });
  }, []);

  // Fetch user's district and crops
  useEffect(() => {
    if (!userEmail) return;

    const fetchUserDistrict = async () => {
      try {
        const res = await fetch(
          "https://agri-shield-w53f.onrender.com/api/users"
        );
        const data = await res.json();
        const matchedUser = data?.users?.find(
          (u) => u.email.toLowerCase() === userEmail.toLowerCase()
        );
        if (matchedUser?.district) setDistrict(matchedUser.district);
      } catch (err) {
        console.log("User district fetch error:", err);
      }
    };

    const fetchUserCrops = async () => {
      const userCrops = await getCropData(userEmail);
      setCrops(userCrops);
    };

    fetchUserDistrict();
    fetchUserCrops();
  }, [userEmail]);

  // Fetch weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherData(district);
      const nextFive = extractNextFiveDays(data.list);
      setWeatherData({ ...data, list: nextFive });
    };
    fetchWeatherData();
  }, [district]);

  const formatBDDate = (utcString) => {
    const utcDate = new Date(utcString);
    const bdDate = new Date(utcDate.getTime() + 6 * 60 * 60 * 1000);
    return bdDate.toLocaleDateString("en-GB");
  };

  const renderAdvisory = (weather) => {
    const rainChance = weather.pop * 100;
    const temp = weather.main.temp;
    let advisoryText = "";

    if (rainChance > 80) {
      advisoryText =
        lang === "bn"
          ? `<ul><li><strong>বৃষ্টির সম্ভাবনা:</strong> ${rainChance}%</li><li>আগামী ৩ দিন বৃষ্টি ${rainChance}%।</li><li>আজই ধান কাটুন অথবা ঢেকে রাখুন।</li><li>বৃষ্টি হলে পানি জমতে পারে, সেচ ব্যবস্থা ঠিক রাখুন।</li></ul>`
          : `<ul><li><strong>Rain chances:</strong> ${rainChance}%</li><li>Rain chances of ${rainChance}% for the next 3 days.</li><li>Harvest today or cover crops.</li><li>Ensure drainage to prevent waterlogging.</li></ul>`;
    } else if (temp > 36) {
      advisoryText =
        lang === "bn"
          ? `<ul><li><strong>তাপমাত্রা:</strong> ${temp}°C</li><li>তাপমাত্রা ${temp}°C পর্যন্ত উঠতে পারে।</li><li>গাছের বৃদ্ধিতে প্রভাব ফেলতে পারে।</li><li>সেচ বাড়ান এবং ছায়া দিন।</li></ul>`
          : `<ul><li><strong>Temperature:</strong> ${temp}°C</li><li>Temperature may rise to ${temp}°C.</li><li>High heat can slow plant growth.</li><li>Increase irrigation and provide shade.</li></ul>`;
    } else {
      advisoryText =
        lang === "bn"
          ? `<ul><li><strong>তাপমাত্রা:</strong> ${temp}°C</li><li>কৃষির জন্য ভালো সময়।</li><li>সেচ ও ফসল তোলার জন্য উপযোগী।</li><li>আর্দ্রতা কমতে পারে, সেচ নিয়ন্ত্রণে রাখুন।</li></ul>`
          : `<ul><li><strong>Temperature:</strong> ${temp}°C</li><li>Good time for farming activities.</li><li>Suitable for irrigation and harvesting.</li><li>Humidity may drop, adjust watering accordingly.</li></ul>`;
    }

    return (
      <div
        className="text-lg text-white"
        dangerouslySetInnerHTML={{ __html: advisoryText }}
      />
    );
  };

  const renderRiskFeedback = (weather, crop) => {
    const temp = weather.main.temp;
    const rainChance = weather.pop * 100;
    let riskStatus = "good";

    if (crop.cropType.includes("grain")) {
      if (temp > 35 || rainChance > 80) riskStatus = "bad";
    } else if (crop.cropType.includes("vegetable")) {
      if (temp < 15 || temp > 35 || rainChance > 70) riskStatus = "bad";
    } else if (crop.cropType.includes("fruit")) {
      if (temp < 20 || temp > 35 || rainChance > 60) riskStatus = "bad";
    } else if (crop.cropType.includes("oilseed")) {
      if (temp < 18 || temp > 32 || rainChance > 75) riskStatus = "bad";
    } else if (crop.cropType.includes("pulse")) {
      if (temp < 18 || temp > 33 || rainChance > 70) riskStatus = "bad";
    }

    const text =
      lang === "bn"
        ? riskStatus === "good"
          ? `<p class="text-green-400 font-semibold">${crop.cropName} এর জন্য আবহাওয়া ভালো আছে।</p>`
          : `<p class="text-red-400 font-semibold">${crop.cropName} এর জন্য আবহাওয়া অনুকূল নয়, সতর্ক থাকুন।</p>`
        : riskStatus === "good"
        ? `<p class="text-green-400 font-semibold">Weather is good for ${crop.cropName}.</p>`
        : `<p class="text-red-400 font-semibold">Weather is not favorable for ${crop.cropName}, stay alert.</p>`;

    return <div dangerouslySetInnerHTML={{ __html: text }} />;
  };

  const renderWeatherIcon = (weather) => {
    return (
      <ProtectedRoute>
        <>
          {weather === "Clear" && (
            <img
              src="/images/sunny.png"
              alt="Sunny"
              className="mx-auto w-24 sm:w-20 md:w-24 lg:w-28"
            />
          )}
          {weather === "Clouds" && (
            <img
              src="/images/Cloudy.png"
              alt="Cloudy"
              className="mx-auto w-24 sm:w-20 md:w-24 lg:w-28"
            />
          )}
          {weather === "Rain" && (
            <img
              src="/images/Rainy.png"
              alt="Rainy"
              className="mx-auto w-24 sm:w-20 md:w-24 lg:w-28"
            />
          )}
          {weather === "Drizzle" && (
            <img
              src="/images/Rainy.png"
              alt="Drizzle"
              className="mx-auto w-24 sm:w-20 md:w-24 lg:w-28"
            />
          )}
          {weather === "Thunderstorm" && (
            <img
              src="/images/Stormy.png"
              alt="Thunderstorm"
              className="mx-auto w-24 sm:w-20 md:w-24 lg:w-28"
            />
          )}
          {weather !== "Clear" &&
            weather !== "Clouds" &&
            weather !== "Rain" &&
            weather !== "Drizzle" &&
            weather !== "Thunderstorm" && (
              <img
                src="/images/partly-cloudy.png"
                alt="Partly-Cloudy"
                className="mx-auto w-24 sm:w-20 md:w-24 lg:w-28"
              />
            )}
        </>
      </ProtectedRoute>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4">
      <div className="w-full max-w-7xl p-8 rounded-2xl">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          {lang === "bn" ? "আবহাওয়া" : "Weather"} - {district}
        </h1>

        {weatherData ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8 justify-items-center">
              {weatherData.list.map((day, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md bg-black/50 p-6 rounded-lg shadow-lg text-center text-white my-4"
                  style={{ background: "rgba(255, 255, 255, 0.2)" }}
                >
                  <h3 className="text-2xl font-semibold">
                    {formatBDDate(day.dt_txt)}
                  </h3>
                  <div className="mt-4">
                    {renderWeatherIcon(day.weather[0].main)}
                  </div>
                  <div className="mt-4 text-2xl">
                    {lang === "bn" ? "তাপমাত্রা" : "Temperature"}:{" "}
                    {day.main.temp}°C
                  </div>
                  <div className="text-xl">
                    {lang === "bn" ? "আর্দ্রতা" : "Humidity"}:{" "}
                    {day.main.humidity}%
                  </div>
                  <div className="text-xl">
                    {lang === "bn" ? "বৃষ্টির সম্ভাবনা" : "Chance of Rain"}:{" "}
                    {day.pop * 100}%
                  </div>
                </div>
              ))}
            </div>

            <div className="backdrop-blur-md bg-black/50 p-8 rounded-lg shadow-lg mt-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                {lang === "bn" ? "কৃষকের পরামর্শ" : "Farmer's Advisory"}
              </h2>
              {weatherData.list[0] && renderAdvisory(weatherData.list[0])}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-800">
            Loading weather data...
          </div>
        )}
      </div>

      <div className="my-12 space-y-6">
        <div className="flex gap-2 items-center justify-center">
          <WeatherWidget
            districtName="Dhaka"
            lat={lat}
            lon={lon}
            onWeatherUpdate={(data) => setWeather(data.weather)}
            onRiskUpdate={(data) => setRisk(data.risk)}
          />
          <VoiceAssistant weather={weather} risk={risk} />
        </div>
        <MapComponent lat={lat} lon={lon} risk={risk} />
      </div>
    </div>
  );
}
