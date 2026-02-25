import { motion } from "framer-motion";

export default function Framework() {
  const items = [
    "Risk Intelligence",
    "Threat Monitoring",
    "Incident Coordination",
    "Governance Layer",
    "Digital Resilience",
    "Advisory Framework"
  ];

  return (
    <section className="relative py-20 md:py-32 bg-[#070707] overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.08),transparent_60%)]"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center px-6">

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 md:mb-20">
          Cyber Defense Framework
        </h2>

        <div className="relative flex flex-col items-center justify-center">

          {/* Core Circle */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-green-600 flex items-center justify-center text-white font-semibold text-base md:text-lg bg-black shadow-[0_0_40px_rgba(0,255,0,0.4)] mb-12 md:mb-0">
            Core<br />Architecture
          </div>

          {/* Cards */}
          <div className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              gap-6 
              md:gap-24 
              w-full 
              max-w-4xl 
              mt-12 
              md:absolute
            ">

            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#111] border border-green-900 text-gray-300 p-6 rounded-lg hover:border-green-500 transition duration-300 text-sm break-words"
              >
                {item}
              </motion.div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}