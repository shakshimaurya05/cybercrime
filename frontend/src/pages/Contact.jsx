import React, { useState } from "react";
import bgImage from "../assets/hero.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requirements: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your request has been submitted successfully!");
  };

  return (
    <>
      <Navbar />

      <div className="relative h-screen w-full overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 animate-slowZoom"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/95"></div>
        <div className="absolute inset-0 bg-red-600/10 mix-blend-overlay"></div>
        <div className="absolute w-full h-1 bg-red-500/40 animate-scanLine"></div>

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center h-full px-6 pt-28 pb-16">

          <div className="w-full max-w-xl 
                          bg-black/70 backdrop-blur-md 
                          border border-red-900 
                          rounded-lg p-6 
                          shadow-xl shadow-red-900/40">

            <h1 className="text-2xl font-bold text-red-600 mb-4 text-center">
              Contact Us
            </h1>

            <form onSubmit={handleSubmit} className="space-y-3">

              {/* Name */}
              <div>
                <label className="block text-xs text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  minLength={3}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-black border border-zinc-700 
                             focus:outline-none focus:border-red-600 text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-black border border-zinc-700 
                             focus:outline-none focus:border-red-600 text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs text-gray-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-black border border-zinc-700 
                             focus:outline-none focus:border-red-600 text-sm"
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-xs text-gray-300 mb-1">
                  Requirements *
                </label>
                <textarea
                  name="requirements"
                  required
                  rows="3"
                  minLength={10}
                  value={formData.requirements}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-black border border-zinc-700 
                             focus:outline-none focus:border-red-600 text-sm"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-red-600 py-2 rounded font-semibold 
                           hover:bg-red-700 transition text-sm mt-2"
              >
                Submit Inquiry
              </button>

            </form>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}