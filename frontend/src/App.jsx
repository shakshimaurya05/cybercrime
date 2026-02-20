

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import ServiceCategory from "./pages/ServiceCategory";

export default function App() {
 
 return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/:serviceType" element={<ServiceCategory />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
}   