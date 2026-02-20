import riskIcon from "../assets/risk.png";
import incidentIcon from "../assets/incident.png";
import complianceIcon from "../assets/compliance.png";
import strategyIcon from "../assets/strategy.png";

export default function FocusAreas() {
  const areas = [
    {
      title: "Digital Risk Assessment Frameworks",
      icon: riskIcon,
    },
    {
      title: "Cyber Incident Coordination",
      icon: incidentIcon,
    },
    {
      title: "Compliance & Control Design",
      icon: complianceIcon,
    },
    {
      title: "Cyber Defense Strategy Planning",
      icon: strategyIcon,
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden px-6">

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0000] via-[#0d0000] to-[#030000]"></div>

    
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.04),transparent_75%)]"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-white text-center">

        <h2 className="text-4xl md:text-5xl font-semibold mb-4">
          Our Proposed Focus Areas
        </h2>

        <p className="mb-16 text-lg">
          Structured cyber defense and security areas under development.
        </p>

        <div className="grid md:grid-cols-4 gap-8">

          {areas.map((area, index) => (
            <div
              key={index}
              className="
                group
                p-10
                min-h-[260px]
                flex flex-col
                items-center
                justify-center
                text-center
                border border-red-900/60
                rounded-xl
                bg-black/30
                backdrop-blur-sm
                transition-all duration-500
                hover:border-red-500
                hover:shadow-[0_0_40px_rgba(255,0,0,0.35)]
                hover:-translate-y-3
              "
            >
              {/* Icon */}
              <img
                src={area.icon}
                alt={area.title}
                className="w-62 h-46 mb-6 opacity-80 group-hover:opacity-100 transition"
              />

              <h3 className="text-lg md:text-xl text-red-400 group-hover:text-red-300 transition">
                {area.title}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
