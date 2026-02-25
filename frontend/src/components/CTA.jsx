import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="relative py-32 bg-black text-center overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.12),transparent_70%)]"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto px-6"
      >

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Build Secure Digital Foundations
        </h2>

        <p className="text-gray-400 mb-10">
          Engage with our initiative to strengthen digital resilience through
          structured cybersecurity architecture.
        </p>

        <Link to="/contact">
          <button className="px-10 py-4 border border-green-600 text-white hover:bg-green-600 transition duration-300 shadow-lg shadow-green-600/30">
            Connect With Us
          </button>
        </Link>

      </motion.div>
    </section>
  );
}