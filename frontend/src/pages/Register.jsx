import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/hero.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Register() {
  const navigate = useNavigate();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    secretKey: "",
  });

  useEffect(() => {
    setTimeout(() => setPageLoaded(true), 200);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Redirect to login page with success message
      navigate("/login", { 
        replace: true,
        state: { message: "Registration successful! Please login." }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/90"></div>

      {/* Green Overlay */}
      <div className="fixed inset-0 bg-green-600/10 mix-blend-overlay"></div>

      {/* Animated scan line */}
      <div className="absolute w-full h-1 bg-green-500/40 animate-scanLine"></div>

      {/* Floating particles */}
      <div className="particles absolute inset-0"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen text-white flex items-center justify-center px-6 py-20">
        <div
          className={`glass-card backdrop-blur-xl bg-black/30 rounded-xl border border-white/20 shadow-2xl p-8 md:p-12 w-full max-w-md transition-all duration-700 ${
            pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-400 mb-2">
              Admin Registration
            </h1>
            <p className="text-gray-400">
              Create your admin account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-500 rounded-lg text-red-400">
              ✕ {error}
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={registerForm.username}
                onChange={handleChange}
                placeholder="Choose a username"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={registerForm.password}
                  onChange={handleChange}
                  placeholder="Choose a password (min 6 characters)"
                  required
                  minLength="6"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 transition"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Secret Key */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">
                Admin Secret Key
              </label>
              <div className="relative">
                <input
                  type={showSecretKey ? "text" : "password"}
                  name="secretKey"
                  value={registerForm.secretKey}
                  onChange={handleChange}
                  placeholder="Enter the admin secret key"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowSecretKey(!showSecretKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 transition"
                >
                  {showSecretKey ? "🙈" : "👁️"}
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                This key is required to create an admin account
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold py-4 rounded-lg transition-all duration-300 shadow-lg shadow-green-500/30 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-400 hover:text-green-300 font-semibold transition"
              >
                Login
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-gray-500 hover:text-green-400 text-sm transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
