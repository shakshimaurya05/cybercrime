import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import bgImage from "../assets/hero.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ServiceCategory() {
  const { id } = useParams();
  const cardsRef = useRef([]);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setPageLoaded(true), 200);
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

  const serviceData = {
    soc: {
      name: "Security Operations Center",
      description:
        "Enterprise-grade 24/7 cyber monitoring, threat intelligence, advanced SIEM integration, anomaly detection and rapid incident response capabilities tailored for mission-critical environments.",
      products: [
        {
          title: "SOC Lite Monitoring",
          description:
            "Real-time log monitoring with AI-powered alerting and compliance-ready reporting dashboards.",
          price: "$999 / month",
          image:
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
        },
        {
          title: "SOC Enterprise Suite",
          description:
            "Full security operations automation with advanced threat intelligence integration and active response orchestration.",
          price: "$2499 / month",
          image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475",
        },
      ],
    },
    vapt: {
      name: "Vulnerability Assessment & Penetration Testing",
      description:
        "Comprehensive vulnerability scanning and penetration testing services across applications, networks and cloud infrastructures.",
      products: [
        {
          title: "Web Application VAPT",
          description:
            "In-depth web app penetration testing covering OWASP Top 10 and business logic vulnerabilities.",
          price: "$1499 / project",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        },
        {
          title: "Cloud Security Audit",
          description:
            "Advanced AWS/Azure cloud misconfiguration assessment with risk prioritization and remediation roadmap.",
          price: "$1999 / project",
          image:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        },
      ],
    },
    "find-info": {
      name: "Digital Exposure Monitoring",
      description:
        "Proactive monitoring of leaked credentials, dark web mentions, executive exposure risks and brand impersonation threats.",
      products: [
        {
          title: "Dark Web Exposure Scan",
          description:
            "Automated scanning of breach databases and dark web marketplaces for exposed credentials.",
          price: "$799 / scan",
          image:
            "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
        },
        {
          title: "Executive Risk Shield",
          description:
            "Continuous monitoring of executive digital exposure with personalized threat alerts.",
          price: "$1299 / month",
          image:
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
        },
      ],
    },
  };

  const activeService = serviceData[id?.toLowerCase()];

  if (!activeService) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl">
        Service Not Found
      </div>
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
          {/* Heading */}
          <div className="text-center mb-16">
            <h1
              className={`text-4xl md:text-5xl font-bold text-green-500 mb-6 transition-all duration-1000 ${
                pageLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-10"
              }`}
            >
              {activeService.name}
            </h1>

            <p
              className={`text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
                pageLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {activeService.description}
            </p>
          </div>

          {/* Cards */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
            {activeService.products.map((product, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`glass-card scroll-card ${
                  index % 2 === 0 ? "from-left" : "from-right"
                } flex flex-col md:flex-row gap-6 p-6 rounded-xl hover:scale-[1.02] transition duration-700`}
              >
                {/* Image */}
                <div className="md:w-40 w-full flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="rounded-lg w-full h-40 object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-green-400 mb-2">
                      {product.title}
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">
                      {product.price}
                    </span>

                    <Link
                      to="#"
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