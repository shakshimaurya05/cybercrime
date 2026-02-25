import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/hero.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Services() {
  const services = [
    {
      id: "soc",
      name: "SOC",
      title: "Security Operations Center",
      short:
        "Continuous 24/7 monitoring, detection and incident response.",
      details:
        "Our SOC functions as a centralized cyber command infrastructure delivering real-time monitoring, SIEM log correlation, anomaly detection and rapid containment strategies for enterprise environments.",
      features: [
        "24/7 Threat Monitoring",
        "Real-Time Log Analysis",
        "Incident Response Execution",
      ],
    },
    {
      id: "vapt",
      name: "VAPT",
      title: "Vulnerability Assessment & Penetration Testing",
      short:
        "Simulated attack testing to identify security weaknesses.",
      details:
        "We conduct structured vulnerability scanning and controlled penetration testing to uncover exploitable flaws across applications, networks and cloud infrastructure.",
      features: [
        "Web & API Testing",
        "Cloud Infrastructure Review",
        "Risk Prioritization",
        "Remediation Guidance",
      ],
    },
    {
      id: "find-info",
      name: "Find Info",
      title: "Find Your Information",
      short:
        "Digital exposure monitoring and breach intelligence.",
      details:
        "We proactively monitor exposed credentials, leaked data and executive risk signals across surface, deep and dark web environments.",
      features: [
        "Dark Web Monitoring",
        "Credential Leak Detection",
        "Executive Risk Alerts",
        "Exposure Mitigation",
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const cardsRef = useRef([]);

  useEffect(() => {
    setTimeout(() => setPageLoaded(true), 200);
  }, []);

  useEffect(() => {
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
  }, []);

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
  }, []);

  const activeService = services[activeIndex];

  return (
    <>
      <Navbar />

      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center scale-110 animate-slowZoom"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/90"></div>
      <div className="fixed inset-0 bg-green-600/10 mix-blend-overlay"></div>
 {/* Animated scan line */}
      <div className="absolute w-full h-1 bg-green-500/40 animate-scanLine"></div>

      {/* Floating particles */}
      <div className="particles absolute inset-0"></div>
      <div className="relative z-10 text-white">

        {/* HERO SECTION */}
        <section className="h-[95vh] flex flex-col justify-center items-center px-6 text-center pt-20 overflow-hidden">

          {/* Heading */}
          <h1
            className={`text-5xl font-bold  mb-12 mt-12 tracking-wide transition-all duration-1000 ${
              pageLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            Our Security Services
          </h1>

          {/* Selector */}
          <div className="flex gap-8 flex-wrap justify-center mb-10">
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
                className={`tilt-card cursor-pointer px-10 py-3 text-lg font-semibold rounded-xl border tracking-wide transition-all duration-700 ${
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
            className={`backdrop-blur-xl bg-black/25 rounded-xl border border-white/20 shadow-2xl shadow-black/40 w-full max-w-4xl px-10 pt-6 py-8 pb-8 transition-all duration-700 ease-in-out float-soft ${
              pageLoaded && fade
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            <h2 className="text-3xl text-green-400 mb-4">
              {activeService.title}
            </h2>

            <p className="text-gray-300 mb-5 text-lg">
              {activeService.short}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
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
                to={`/services/${activeService.id}`}
                className="inline-block bg-green-600 px-10 py-4 rounded-lg hover:bg-green-700 transition font-semibold shadow-lg"
              >
                Explore Service
              </Link>
            </div>
          </div>
        </section>

        {/* SCROLL SECTION */}
        <section className="py-20 px-8 md:px-16">
          <div className=" max-w-7xl mx-auto grid md:grid-cols-2 gap-16">

            {services.map((service, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`tilt-card backdrop-blur-xl bg-black/25 rounded-xl border border-white/20 shadow-2xl shadow-black/40  scroll-card ${
                  index % 2 === 0 ? "from-left" : "from-right"
                } border border-green-800 rounded-xl p-10 hover:scale-105 hover:border-green-500 hover:shadow-xl`}
              >
                <h3 className="text-2xl text-green-400 mb-6">
                  {service.title}
                </h3>

                <p className="text-gray-400 mb-8 text-base">
                  {service.details}
                </p>

                <Link
                  to={`/services/${service.id}`}
                  className="inline-block border border-green-600 px-8 py-3 rounded-md hover:bg-green-700 transition"
                >
                  Learn More
                </Link>
              </div>
            ))}

          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}