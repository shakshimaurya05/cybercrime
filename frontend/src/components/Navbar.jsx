import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-black border-b border-green-900 z-[9999]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center text-white relative">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-green-500 flex-shrink-0">
          Cyber Initiative
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center flex-shrink-0">

          <Link to="/" className="hover:text-green-500 transition">
            Home
          </Link>

           <Link to="/services" className="hover:text-green-400 transition">
            Services
          </Link>


          <Link to="/gallery" className="hover:text-green-500 transition">
            Gallery
          </Link>

          <Link to="/about" className="hover:text-green-500 transition">
            About
          </Link>

          <Link to="/contact" className="hover:text-green-500 transition">
            Contact
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-2xl text-white hover:text-green-500 transition z-50 block flex-shrink-0 ml-auto"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-green-900 px-6 py-4 space-y-4 text-white">

          <Link to="/" className="block hover:text-green-500">
            Home
          </Link>

          <Link to="/services" className="block hover:text-green-500">
            Services
          </Link>

          <Link to="/gallery" className="block hover:text-green-500">
            Gallery
          </Link>

          <Link to="/about" className="block hover:text-green-500">
            About
          </Link>

          <Link to="/contact" className="block hover:text-green-500">
            Contact
          </Link>

        </div>
      )}
    </nav>
  );
}