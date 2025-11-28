"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/app/LanguageContext"; // Import language context

// Define the weather fetch function
const getWeatherData = async (district) => {
  const apiKey = "4e2b41473b83f744ee4afc80dae9aac2"; // OpenWeather API key
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${district},BD&units=metric&cnt=5&appid=${apiKey}`;

  const res = await fetch(weatherApiUrl);
  const data = await res.json();
  return data;
};

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [district, setDistrict] = useState("Rajshahi"); // Example district
  const { lang, setLang } = useLanguage(); // Get lang and setLang from context

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherData(district);
      setWeatherData(data);
    };

    fetchWeatherData();
  }, [district]); // Fetch new data when district changes

  // Detailed advisory message
  const renderAdvisory = (weather) => {
    const rainChance = weather.pop * 100; // Probability of rain in percentage
    const temp = weather.main.temp; // Temperature in Celsius

    let advisoryText = "";

    // Rainy weather advisory
    if (rainChance > 80) {
      advisoryText = lang === "bn"
        ? `
            <ul class="">
              <li><strong>বৃষ্টির সম্ভাবনা:</strong> ${rainChance}%</li>
              <li>আগামী ৩ দিন বৃষ্টি ${rainChance}%।</li>
              <li>আজই ধান কাটুন অথবা ঢেকক রাখুন।</li>
              <li>বৃষ্টি হলে মাটিতে পানি জমতে পারে, সেচ ব্যবস্থা নিশ্চিত করুন।</li>
            </ul>`
        : `
            <ul class="">
              <li><strong>Rain chances:</strong> ${rainChance}%</li>
              <li>Rain chances of ${rainChance}% for the next 3 days.</li>
              <li>Harvest rice today or cover crops.</li>
              <li>Ensure proper drainage to prevent waterlogging and crop damage.</li>
            </ul>`;
    }

    // High temperature advisory
    else if (temp > 36) {
      advisoryText = lang === "bn"
        ? `
            <ul class="">
              <li><strong>তাপমাত্রা:</strong> ${temp}°C</li>
              <li>তাপমাত্রা ${temp}°C উঠকব।</li>
              <li>গাছের বৃদ্ধিতে বাধা হতে পারে।</li>
              <li>পানি বাড়ান এবং গাছের চারপাশে ছায়া তৈরি করুন।</li>
            </ul>`
        : `
            <ul class="">
              <li><strong>Temperature:</strong> ${temp}°C</li>
              <li>Temperature rising to ${temp}°C.</li>
              <li>High temperatures can hinder plant growth.</li>
              <li>Increase irrigation and provide shade around crops to prevent heat stress.</li>
            </ul>`;
    }

    // General advisory for moderate temperatures
    else {
      advisoryText = lang === "bn"
        ? `
            <ul class="">
              <li><strong>তাপমাত্রা:</strong> ${temp}°C</li>
              <li>কৃষি কাজে উত্তম সময়।</li>
              <li>এটি সেচ ও ফসল তোলার জন্য ভাল সময়।</li>
              <li>আর্দ্রতা কমতে পারে, তাই সেচের পরিমাণ নিয়ন্ত্রণে রাখুন।</li>
            </ul>`
        : `
            <ul class="">
              <li><strong>Temperature:</strong> ${temp}°C</li>
              <li>Good time for farming activities.</li>
              <li>Suitable for irrigation and harvesting.</li>
              <li>Monitor water levels as humidity may drop, control irrigation accordingly.</li>
            </ul>`;
    }

    return (
      <div
        className="text-lg text-white"
        dangerouslySetInnerHTML={{ __html: advisoryText }}
      />
    );
  };

  // Render weather icons based on the condition
const renderWeatherIcon = (weather) => {
  return (
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
            {/* Weather Forecast Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8 justify-items-center">
  {weatherData.list.map((day, index) => (
    <div
      key={index}
      className="backdrop-blur-md bg-black/50 p-6 rounded-lg shadow-lg text-center text-white my-4"
      style={{
        background: "rgba(255, 255, 255, 0.2)",
      }}
    >
      <div className="mb-6 w-full">
        <h3 className="text-2xl font-semibold">
          {new Date(day.dt_txt).toLocaleDateString("en-GB")}
        </h3>
        <div className="mt-4">{renderWeatherIcon(day.weather[0].main)}</div>
        <div className="mt-4 text-2xl">
          {lang === "bn" ? "তাপমাত্রা" : "Temperature"}: {day.main.temp}°C
        </div>
        <div className="text-xl">
          {lang === "bn" ? "আর্দ্রতা" : "Humidity"}: {day.main.humidity}%
        </div>
        <div className="text-xl">
          {lang === "bn" ? "বৃষ্টির সম্ভাবনা" : "Chance of Rain"}: {day.pop * 100}%
        </div>
      </div>
    </div>
  ))}
</div>


            {/* Advisory Card */}
            {/* Advisory Card */}
<div className="backdrop-blur-md bg-black/50 p-8 rounded-lg shadow-lg mt-8 text-center">
  <h2 className="text-2xl font-bold text-white mb-4">
    {lang === "bn" ? "কৃষকের পরামর্শ" : "Farmer's Advisory"}
  </h2>
  {renderAdvisory(weatherData.list[0])}
</div>

          </>
        ) : (
          <div className="text-center text-gray-800">Loading weather data...</div>
        )}
      </div>
    </div>
  );
}
