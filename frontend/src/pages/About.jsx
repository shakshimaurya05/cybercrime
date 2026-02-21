import React from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/hero.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 }
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 }
};

export default function About() {
  return (
    <>
      <Navbar />

      <div className="relative w-full overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/80 to-black/95"></div>
        <div className="absolute inset-0 bg-red-600/10 mix-blend-overlay"></div>

        <div className="relative z-20 px-6 md:px-16 pt-32 pb-20 space-y-32">

          {/* SECTION 1 */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-6">
              Who We Are
            </h1>
            <p className="text-gray-300 leading-relaxed">
              Cyber Initiative delivers advanced cybersecurity solutions including
              VAPT, SOC monitoring, and digital intelligence services.
              We protect organizations by identifying and eliminating vulnerabilities
              before they can be exploited.
            </p>
          </motion.section>


          {/* SECTION 2 */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Our Mission",
                desc: "Deliver proactive cybersecurity solutions that prevent breaches and protect data."
              },
              {
                title: "Our Vision",
                desc: "Become a globally trusted cybersecurity partner."
              },
              {
                title: "Core Expertise",
                desc: "Penetration testing, 24/7 monitoring, cyber investigation, and risk management."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-black/60 backdrop-blur-md border border-red-900
                           rounded-xl p-8 text-center
                           hover:shadow-red-900/40 transition"
              >
                <h3 className="text-xl font-semibold mb-4 text-red-500">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>


          {/* SECTION 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-2xl shadow-red-900/40"
            >
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80"
                alt="Cyber"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-black/60 border border-red-900 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-red-500 mb-2">
                  Trusted Security Frameworks
                </h4>
                <p className="text-gray-400 text-sm">
                  Industry-recognized standards ensure high-level protection.
                </p>
              </div>

              <div className="bg-black/60 border border-red-900 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-red-500 mb-2">
                  Advanced Threat Detection
                </h4>
                <p className="text-gray-400 text-sm">
                  Real-time monitoring and intelligent threat analysis.
                </p>
              </div>
            </motion.div>
          </div>


          {/* SECTION 4 */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-red-600 mb-12">
              Our Impact
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "150+", label: "Assessments Completed" },
                { number: "50+", label: "Organizations Protected" },
                { number: "24/7", label: "Monitoring Support" },
                { number: "99%", label: "Detection Accuracy" }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-black/60 border border-red-900 rounded-xl p-6"
                >
                  <h3 className="text-3xl font-bold text-red-500 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

        </div>
      </div>

      <Footer />
    </>
  );
}