"use client";

import React from "react";
import Lottie from "lottie-react";

export default function Loading({ message }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="w-24 h-24 sm:w-32 sm:h-32">
        <Lottie
          animationData={undefined} // placeholder
          loop={true}
          path="/images/Spinner.json" // load from public folder
        />
      </div>
      {message && (
        <p className="mt-4 text-white text-sm sm:text-base font-medium">
          {message}
        </p>
      )}
    </div>
  );
}
