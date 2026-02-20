import React from "react";
import bgImage from "../assets/hero.png";

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-slowZoom"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80"></div>

      {/* Red Light effect */}
      <div className="absolute inset-0 bg-red-600/10 mix-blend-overlay"></div>

      {/* Animated scan line */}
      <div className="absolute w-full h-1 bg-red-500/40 animate-scanLine"></div>

      {/* Floating particles */}
      <div className="particles absolute inset-0"></div>

      {/* Hero content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">

        <div className="backdrop-blur-md bg-black/30 p-10 rounded-xl border border-red-500/30 shadow-2xl shadow-red-900/40">

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Securing Digital Infrastructure
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10">
            Strategic Cyber Defense Initiative
          </p>

          <div className="flex gap-6 justify-center">
            <button className="px-8 py-3 border border-red-600 text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-600/50 transition rounded-md">
              Explore Services
            </button>

            <button className="px-8 py-3 bg-red-600 text-white hover:bg-red-700 hover:shadow-xl hover:shadow-red-500/50 transition rounded-md">
              Contact Us
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
