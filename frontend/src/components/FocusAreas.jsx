import { motion } from "framer-motion";
import riskIcon from "../assets/risk.png";
import incidentIcon from "../assets/incident.png";
import complianceIcon from "../assets/compliance.png";
import strategyIcon from "../assets/strategy.png";

export default function FocusAreas() {
  const areas = [
    { title: "Digital Risk Assessment Frameworks", icon: riskIcon },
    { title: "Cyber Incident Coordination", icon: incidentIcon },
    { title: "Compliance & Control Design", icon: complianceIcon },
    { title: "Cyber Defense Strategy Planning", icon: strategyIcon },
  ];

  return (
    <section className="relative py-32 overflow-hidden px-6">

      <div className="absolute inset-0 bg-gradient-to-b from-[#000a00] via-[#000d00] to-[#000300]"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.04),transparent_75%)]"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-white text-center">

        {/* Heading from top */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold mb-4"
        >
          Our Proposed Focus Areas
        </motion.h2>

        {/* Text from bottom */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16 text-lg"
        >
          Structured cyber defense and security areas under development.
        </motion.p>

        <div className="grid md:grid-cols-4 gap-8">

          {areas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              className="
                group
                p-10
                min-h-[260px]
                flex flex-col
                items-center
                justify-center
                text-center
                border border-green-900/60
                rounded-xl
                bg-black/30
                backdrop-blur-sm
                transition-all duration-500
                hover:border-green-500
                hover:shadow-[0_0_40px_rgba(0,255,0,0.35)]
                hover:-translate-y-3
              "
            >
              <img
                src={area.icon}
                alt={area.title}
                className="w-62 h-46 mb-6 opacity-80 group-hover:opacity-100 transition"
              />

              <h3 className="text-lg md:text-xl text-green-400 group-hover:text-green-300 transition">
                {area.title}
              </h3>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}