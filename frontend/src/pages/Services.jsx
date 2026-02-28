import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/hero.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axios";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const cardsRef = useRef([]);

  // Fetch categories from backend on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/categories');
        console.log('Categories fetched:', response.data);

        // Map backend categories to match the UI structure
        const mappedServices = response.data.map(category => ({
          id: category._id,
          // Short name for selector (use name field)
          name: category.name,
          // Full title for detail panel
          title: category.title,
          // Short description
          short: category.shortDescription,
          // Full details
          details: category.detailedDescription,
          // Features array from backend
          features: category.features,
          // Image
          image: category.image,
          // Category (for URL)
          category: category.name
        }));

        console.log('Mapped categories:', mappedServices);
        setServices(mappedServices);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setTimeout(() => setPageLoaded(true), 200);
  }, []);

  useEffect(() => {
    // Only start rotation if we have services
    if (services.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActiveIndex((prev) =>
          prev === services.length - 1 ? 0 : prev + 1
        );
        setFade(true);
      }, 600);
    }, 2500);

    return () => clearInterval(interval);
  }, [services.length]); // Re-create interval when services change

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
  }, [services]); // Re-run when services change

  const activeService = services[activeIndex];

  return (
    <>
      <Navbar />

      <div className="relative z-0">
        {/* Background */}
        <div
          className="fixed inset-0 bg-cover bg-center scale-110 animate-slowZoom"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>

        <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/90"></div>
        <div className="fixed inset-0 bg-green-600/10 mix-blend-overlay"></div>
        {/* Animated scan line */}
        <div className="absolute w-full h-1 bg-green-500/40 animate-scanLine pointer-events-none"></div>

        {/* Floating particles */}
        <div className="particles absolute inset-0 pointer-events-none"></div>
        <div className="relative z-10 text-white">

        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 text-center py-20 sm:py-24 md:py-28 overflow-visible">

          {/* Loading State */}
          {loading && (
            <div className="text-center">
              <div className="text-green-400 text-xl mb-4">Loading services...</div>
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-500 rounded-lg text-red-400">
              ✕ {error}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && services.length === 0 && (
            <div className="text-center text-gray-400">
              <p className="text-xl">No services available yet.</p>
            </div>
          )}

          {/* Content - Only render when services exist */}
          {!loading && !error && services.length > 0 && (
            <>
              {/* Heading */}
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-8  sm:mt-1 md:mt-1 lg:mt-1 tracking-wide transition-all duration-1000 ${
                  pageLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-10"
                }`}
              >
                Our Security Services
              </h1>

              {/* Selector */}
              <div className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 flex-wrap justify-center mb-6 sm:mb-8 md:mb-10">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    onMouseEnter={() => {
                      setFade(false);
                      setTimeout(() => {
                        setActiveIndex(index);
                        setFade(true);
                      }, 200);
                    }}
                    className={`tilt-card cursor-pointer px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-semibold rounded-xl border tracking-wide transition-all duration-700 uppercase ${
                      pageLoaded
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    } ${
                      activeIndex === index
                        ? "border-green-400 bg-green-900/40 scale-105 glow-border"
                        : "border-green-900 hover:border-green-500"
                    }`}
                    style={{
                      transitionDelay: `${index * 150}ms`,
                    }}
                  >
                    {service.name}
                  </div>
                ))}
              </div>

              {/* Detail Panel */}
              <div
                className={`backdrop-blur-xl bg-black/25 rounded-xl border border-white/20 shadow-2xl shadow-black/40 w-full max-w-4xl px-4 sm:px-6 md:px-10 pt-4 sm:pt-6 py-6 sm:py-8 pb-6 sm:pb-8 transition-all duration-700 ease-in-out float-soft ${
                  pageLoaded && fade
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                }`}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl text-green-400 mb-3 sm:mb-4">
                  {activeService.title}
                </h2>

                <p className="text-gray-300 mb-4 sm:mb-5 text-sm sm:text-base md:text-lg">
                  {activeService.short}
                </p>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  {activeService.features.map((feature, i) => (
                    <span
                      key={i}
                      className="bg-green-500/10 backdrop-blur-sm px-5 py-2 rounded-md text-sm border border-green-500/30"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-2">
                  <Link
                    to={`/services/${activeService.category}`}
                    className="inline-block bg-green-600 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg hover:bg-green-700 transition font-semibold shadow-lg w-full sm:w-auto text-center"
                  >
                    Explore Service
                  </Link>
                </div>
              </div>
            </>
          )}
        </section>

        {/* SCROLL SECTION  */}
        {!loading && !error && services.length > 0 && (
          <section className="py-8 px-8 md:px-16">
            <div className=" max-w-7xl mx-auto grid md:grid-cols-2 gap-16">

              {services.map((service, index) => (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className={`tilt-card backdrop-blur-xl bg-black/25 rounded-xl border border-white/20 shadow-2xl shadow-black/40  scroll-card ${
                    index % 2 === 0 ? "from-left" : "from-right"
                  } border border-green-800 rounded-xl p-6 sm:p-8 md:p-10 hover:scale-105 hover:border-green-500 hover:shadow-xl`}
                >
                  <h3 className="text-xl sm:text-2xl text-green-400 mb-4 sm:mb-6">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
                    {service.details}
                  </p>

                  <Link
                    to={`/services/${service.category}`}
                    className="inline-block border border-green-600 px-6 sm:px-8 py-2 sm:py-3 rounded-md hover:bg-green-700 transition text-sm sm:text-base"
                  >
                    Learn More
                  </Link>
                </div>
              ))}

            </div>
          </section>
        )}

        </div>
      </div>

      <Footer />
    </>
  );
}
