import React, { useState } from "react";
import bgImage from "../assets/hero.png";
import Navbar from "../components/Navbar";

export default function Gallery() {

  const images = [
    "https://static.pib.gov.in/WriteReadData/userfiles/image/L1P26UYR.jpeg",
    "https://static.pib.gov.in/WriteReadData/userfiles/image/L1P1ODLY.JPG",
    "https://www.frankleisureandevents.com/images/service/corporate-conference.jpg",
    "https://www.frankleisureandevents.com/images/service/facility-and-activity.jpg"
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen w-full overflow-hidden pt-10">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 animate-slowZoom"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90"></div>

        {/* Green Light Overlay */}
        <div className="absolute inset-0 bg-green-600/10 mix-blend-overlay"></div>

        {/* Scan Line */}
        <div className="absolute w-full h-1 bg-green-500/40 animate-scanLine"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6">

          {/* Main Image */}
          <div className="w-[460px] h-[340px] md:w-[520px] md:h-[380px]
                          border-4 border-green-600
                          shadow-2xl shadow-green-900/50
                          overflow-hidden rounded-xl
                          mb-6 transition duration-500">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 md:w-20 md:h-20 cursor-pointer border-2
                ${selectedImage === img ? "border-green-600" : "border-gray-600"}
                rounded-md overflow-hidden hover:scale-105 transition duration-300`}
              >
                <img
                  src={img}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}