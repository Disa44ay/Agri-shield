"use client";

import { useRef, useState, useEffect } from "react";

export default function VoiceAssistant({ weather, risk }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const recognitionRef = useRef(null);
  const voicesRef = useRef([]);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = speechSynthesis.getVoices();
    };
    loadVoices();
    speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () =>
      speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, []);

  // Initialize SpeechRecognition
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!recognitionRef.current) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        console.warn("Browser does not support SpeechRecognition!");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "bn-BD";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        console.log("User said:", spokenText);
        setTranscript(spokenText);
        handleQuery(spokenText);
      };

      recognition.onend = () => {
        setListening(false);
        console.log("Recognition ended");
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Handle queries
  const handleQuery = (query) => {
    let answer = "";

    const normalizedQuery = query.trim().toLowerCase();

    if (!weather || !risk) {
      answer = "দুঃখিত, আবহাওয়ার তথ্য এখনও প্রস্তুত নয়।";
    } else if (
      normalizedQuery.includes("আবহাওয়া") ||
      normalizedQuery.includes("ঝুঁকি")
    ) {
      answer = `আজকের আবহাওয়া ${weather.temp}°C, আর্দ্রতা ${weather.humidity}%, বৃষ্টির সম্ভাবনা ${weather.rain}%. ঝুঁকি: ${risk.level}`;
    } else if (
      normalizedQuery.includes("ধান") &&
      normalizedQuery.includes("অবস্থা")
    ) {
      answer = `আপনার ধানের জমিতে ${risk.level.toLowerCase()}. আর্দ্রতা: ${
        weather.humidity
      }%, বৃষ্টি: ${weather.rain}%`;
    } else if (normalizedQuery.includes("গুদাম")) {
      answer = "গুদামে পণ্য ভালো আছে, আর্দ্রতা নিয়ন্ত্রণ করুন।";
    } else if (normalizedQuery.includes("কাটব")) {
      answer = "ধান কাটার উপযুক্ত সময় আগামী ৫–৭ দিনে।";
    } else {
      answer = "দুঃখিত, আমি সেটা বুঝতে পারিনি।";
    }

    console.log("Answer:", answer);
    setResponse(answer);
    speakBangla(answer);
  };

  // Speak in Bengali
  const speakBangla = (text) => {
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const bnVoice = voicesRef.current.find((v) => v.lang.includes("bn"));

    if (bnVoice) utterance.voice = bnVoice;
    else utterance.lang = "en-US";

    speechSynthesis.speak(utterance);
  };

  // Toggle listening
  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
      console.log("Listening started...");
    }
  };

  return (
    <div className="p-4 bg-gray-50 border rounded-lg w-96">
      <button
        onClick={toggleListening}
        disabled={!weather || !risk}
        className={`px-6 py-2 rounded-lg font-medium ${
          listening ? "bg-red-500" : "bg-green-500"
        } text-white ${
          !weather || !risk ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {listening ? "শুনছি..." : "বক্তব্য বলুন"}
      </button>

      <p className="mt-2 text-gray-600">আপনার কথোপকথন: {transcript || "-"}</p>
      <p className="mt-1 font-semibold text-gray-800">
        সিস্টেমের উত্তর: {response || "-"}
      </p>
    </div>
  );
}
