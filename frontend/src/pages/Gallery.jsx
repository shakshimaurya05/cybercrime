import React, { useState, useEffect } from "react";
import bgImage from "../assets/hero.png";
import Navbar from "../components/Navbar";
import api from "../api/axios";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch gallery images from backend
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/gallery');
        setImages(response.data);
        if (response.data.length > 0) {
          setSelectedImage(response.data[0].imageUrl);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError('Failed to load gallery images.');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

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
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 py-20">

          {/* Loading State */}
          {loading && (
            <div className="text-center">
              <div className="text-green-400 text-xl mb-4">Loading gallery...</div>
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-500 rounded-lg text-red-400">
              ✕ {error}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && images.length === 0 && (
            <div className="text-center text-gray-400">
              <p className="text-xl">No images in the gallery yet.</p>
            </div>
          )}

          {/* Gallery Content */}
          {!loading && !error && images.length > 0 && (
            <>
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
                    onClick={() => setSelectedImage(img.imageUrl)}
                    className={`w-16 h-16 md:w-20 md:h-20 cursor-pointer border-2
                    ${selectedImage === img.imageUrl ? "border-green-600" : "border-gray-600"}
                    rounded-md overflow-hidden hover:scale-105 transition duration-300`}
                  >
                    <img
                      src={img.imageUrl}
                      alt={img.title || `Gallery image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}