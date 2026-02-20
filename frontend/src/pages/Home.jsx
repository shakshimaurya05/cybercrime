import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Initiative from "../components/Initiative";
import FocusAreas from "../components/FocusAreas";
import Framework from "../components/Framework";
import ThreatLandscape from "../components/ThreatLandscape";
import CTA from "../components/CTA";
import Footer from "../components/Footer";


export default function Home() {
 
  return (
    <div className="bg-[#0f0f12] text-white">
      <Navbar />
      <Hero />
      <Initiative />
      <FocusAreas />
     <Framework />
<ThreatLandscape />
      <CTA />
      <Footer />
    </div>
  );
}