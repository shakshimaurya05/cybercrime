import { motion } from "framer-motion";
import visionImg from "../assets/img1.png";

export default function Initiative() {
  return (
    <section className="relative py-32 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000d00] via-[#001200] to-[#000500]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.12),transparent_60%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-[2px] bg-green-600 mb-6"></div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide">
              Vision for a Secure Digital Future
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              A cybersecurity framework initiative focused on strengthening
              digital infrastructure through strategic coordination and
              structured implementation models.
            </p>

            <p className="text-gray-400 leading-relaxed">
              Our objective is to develop structured security mechanisms
              aligned with regulatory direction and evolving digital risk
              landscapes.
            </p>
          </motion.div>

          {/* RIGHT SIDE IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative group perspective"
          >
          
            <div className="absolute inset-0 bg-green-600/20 blur-3xl opacity-40 group-hover:opacity-70 transition duration-500"></div>

            <img
              src={visionImg}
              alt="Cyber Vision"
              className="relative rounded-lg shadow-2xl border border-green-900 transform transition duration-500 group-hover:rotate-y-6 group-hover:scale-105"
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
}