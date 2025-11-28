"use client";
import Lottie from "lottie-react";
import animationData from "@/public/lottie/farmer.json"; // your downloaded JSON

export default function FarmerAnimation() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Lottie 
        animationData={animationData}
        loop={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
