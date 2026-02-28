import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import bgImage from "../assets/hero.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axios";

export default function ServiceCategory() {
  const { id } = useParams();
  const cardsRef = useRef([]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => setPageLoaded(true), 200);
  }, []);

  // Fetch category details and services by category from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('=== Fetching Category and Service Cards ===');
        console.log('Category:', id);
        setLoading(true);

        // Fetch category details and cards in parallel
        const [categoryRes, cardsRes] = await Promise.all([
          api.get(`/api/categories/name/${id}`),
          api.get(`/api/cards/category/${id}`)
        ]);

        console.log('Category fetched:', categoryRes.data);
        console.log('Cards fetched:', cardsRes.data);
        console.log('Cards count:', cardsRes.data.length);

        setCategory(categoryRes.data);
        setServices(cardsRes.data);
        setError(null);
      } catch (err) {
        console.error('=== Error Fetching Data ===');
        console.error('Error:', err);
        console.error('Response:', err.response?.data);
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      console.log('=== useEffect triggered with category:', id, '===');
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show-card");
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [services]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <div className="text-green-400 text-xl mb-4">Loading services...</div>
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center text-red-400 text-xl">✕ {error}</div>
        </div>
      </>
    );
  }

  if (!loading && services.length === 0 && !category) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl">
          No services found for this category
        </div>
      </>
    );
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center overflow-x-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/90"></div>

      {/* Green Overlay */}
      <div className="absolute inset-0 bg-green-600/10 mix-blend-overlay"></div>

      <div className="relative z-10">
        <Navbar />

        <main className="pt-32 px-6 pb-20 text-white">
          {/* Heading - Category Info */}
          <div className="text-center mb-16">
            <h1
              className={`text-4xl md:text-5xl font-bold text-green-500 mb-6 transition-all duration-1000 ${
                pageLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-10"
              }`}
            >
              {category?.title || id?.toUpperCase()}
            </h1>

            <p
              className={`text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
                pageLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {category?.detailedDescription || ''}
            </p>
          </div>

          {/* Cards */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <div
                key={service._id || index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`glass-card scroll-card ${
                  index % 2 === 0 ? "from-left" : "from-right"
                } flex flex-col md:flex-row gap-6 p-6 rounded-xl hover:scale-[1.02] transition duration-700`}
              >
                {/* Image */}
                <div className="md:w-40 w-full flex-shrink-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="rounded-lg w-full h-40 object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-green-400 mb-2">
                      {service.title}
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {service.shortDescription || service.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">
                      {service.price > 0 ? `₹${service.price}` : 'Contact Us'}
                    </span>

                    <Link
                      to="/contact"
                      className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition text-sm font-semibold"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}