import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-black border-b border-red-900 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">

        <Link to="/" className="text-xl font-bold text-red-500">
          Cyber Initiative
        </Link>

        <div className="flex space-x-8 items-center">

          <Link to="/" className="hover:text-red-500 transition">
            Home
          </Link>

          {/* Services dropdown */}
          <div className="relative group">
            <span className="cursor-pointer hover:text-red-500 transition">
              Services
            </span>

            <div className="absolute top-full left-0 bg-black border border-red-900 
                            rounded-md py-2 w-56 hidden group-hover:block">

              <Link
                to="/services/vapt"
                className="block px-4 py-2 hover:bg-red-900/40"
              >
                VAPT
              </Link>

              <Link
                to="/services/soc"
                className="block px-4 py-2 hover:bg-red-900/40"
              >
                SOC Monitoring
              </Link>

              <Link
                to="/services/find-info"
                className="block px-4 py-2 hover:bg-red-900/40"
              >
                Find Your Information
              </Link>

            </div>
          </div>

          <Link to="/gallery" className="hover:text-red-500 transition">
            Gallery
          </Link>

          <Link to="/about" className="hover:text-red-500 transition">
            About
          </Link>

          <Link to="/contact" className="hover:text-red-500 transition">
            Contact
          </Link>

        </div>
      </div>
    </nav>
  );
}
