"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/app/LanguageContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// FIXED WEATHER FETCH (removed cnt=5)
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
    const date = item.dt_txt.split(" ")[0]; // take the date only

    if (!daily[date]) {
      daily[date] = item; // first available entry for each date
    }
  });

  const days = Object.values(daily);

  return days.slice(1, 6); // skip today → give next 5 days
};


export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [district, setDistrict] = useState("Rajshahi");
  const { lang } = useLanguage();

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherData(district);
      const nextFive = extractNextFiveDays(data.list);
      setWeatherData({ ...data, list: nextFive });
    };

    fetchWeatherData();
  }, [district]);

  // ⭐ FIX ADDED: Convert UTC dt_txt to Bangladesh Time (UTC+6)
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
          ? `
        <ul class="">
          <li><strong>বৃষ্টির সম্ভাবনা:</strong> ${rainChance}%</li>
          <li>আগামী ৩ দিন বৃষ্টি ${rainChance}%।</li>
          <li>আজই ধান কাটুন অথবা ঢেকে রাখুন।</li>
          <li>বৃষ্টি হলে পানি জমতে পারে, সেচ ব্যবস্থা ঠিক রাখুন।</li>
        </ul>`
          : `
        <ul class="">
          <li><strong>Rain chances:</strong> ${rainChance}%</li>
          <li>Rain chances of ${rainChance}% for the next 3 days.</li>
          <li>Harvest today or cover crops.</li>
          <li>Ensure drainage to prevent waterlogging.</li>
        </ul>`;
    } else if (temp > 36) {
      advisoryText =
        lang === "bn"
          ? `
        <ul class="">
          <li><strong>তাপমাত্রা:</strong> ${temp}°C</li>
          <li>তাপমাত্রা ${temp}°C পর্যন্ত উঠতে পারে।</li>
          <li>গাছের বৃদ্ধিতে প্রভাব ফেলতে পারে।</li>
          <li>সেচ বাড়ান এবং ছায়া দিন।</li>
        </ul>`
          : `
        <ul class="">
          <li><strong>Temperature:</strong> ${temp}°C</li>
          <li>Temperature may rise to ${temp}°C.</li>
          <li>High heat can slow plant growth.</li>
          <li>Increase irrigation and provide shade.</li>
        </ul>`;
    } else {
      advisoryText =
        lang === "bn"
          ? `
        <ul class="">
          <li><strong>তাপমাত্রা:</strong> ${temp}°C</li>
          <li>কৃষির জন্য ভালো সময়।</li>
          <li>সেচ ও ফসল তোলার জন্য উপযোগী।</li>
          <li>আর্দ্রতা কমতে পারে, সেচ নিয়ন্ত্রণে রাখুন।</li>
        </ul>`
          : `
        <ul class="">
          <li><strong>Temperature:</strong> ${temp}°C</li>
          <li>Good time for farming activities.</li>
          <li>Suitable for irrigation and harvesting.</li>
          <li>Humidity may drop, adjust watering accordingly.</li>
        </ul>`;
    }

    return (
      <div
        className="text-lg text-white"
        dangerouslySetInnerHTML={{ __html: advisoryText }}
      />
    );
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
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4">
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
                  <div className="mb-6 w-full">
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
                </div>
              ))}
            </div>

            <div className="backdrop-blur-md bg-black/50 p-8 rounded-lg shadow-lg mt-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                {lang === "bn" ? "কৃষকের পরামর্শ" : "Farmer's Advisory"}
              </h2>
              {renderAdvisory(weatherData.list[0])}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-800">
            Loading weather data...
          </div>
        )}
      </div>
    </div>
  );
}
