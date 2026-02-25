

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import ServiceCategory from "./pages/ServiceCategory";
import Services from "./pages/Services";
export default function App() {
 
 return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/:id" element={<ServiceCategory />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
}   