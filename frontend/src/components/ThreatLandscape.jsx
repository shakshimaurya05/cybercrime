import { motion } from "framer-motion";

export default function ThreatLandscape() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Understanding the Modern Threat Landscape
          </h2>

          <p className="text-gray-400 leading-relaxed">
            The digital environment is rapidly evolving, with increasingly
            complex attack vectors, supply chain vulnerabilities, and
            infrastructure-level risks. A structured, forward-looking
            cybersecurity model is essential to maintain resilience.
          </p>
        </motion.div>

        {/* RIGHT CARDS */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {[
            "Ransomware Evolution",
            "Supply Chain Vulnerabilities",
            "Social Engineering Expansion",
            "Critical Infrastructure Exposure"
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[#111] border border-red-900 rounded-lg p-6 hover:border-red-500 transition duration-300 text-gray-300"
            >
              {item}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
