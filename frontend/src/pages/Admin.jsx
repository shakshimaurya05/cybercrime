import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/hero.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axios";

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("add-service");
  const [pageLoaded, setPageLoaded] = useState(false);

  // Get admin info from localStorage
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");

  // Form states
  const [serviceForm, setServiceForm] = useState({
    name: "",
    title: "",
    short: "",
    details: "",
    features: "",
  });

  const [cardForm, setCardForm] = useState({
    category: "soc",
    title: "",
    description: "",
    price: "",
    image: null,
  });

  // Store added items (from backend)
  const [addedServices, setAddedServices] = useState([]);
  const [addedCards, setAddedCards] = useState([]);
  const [showServiceSuccess, setShowServiceSuccess] = useState(false);
  const [showCardSuccess, setShowCardSuccess] = useState(false);
  const [showServiceError, setShowServiceError] = useState(false);
  const [showCardError, setShowCardError] = useState(false);
  const [serviceErrorMessage, setServiceErrorMessage] = useState("");
  const [cardErrorMessage, setCardErrorMessage] = useState("");

  // Fetch existing services and gallery images on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, galleryRes] = await Promise.all([
          api.get('/api/services'),
          api.get('/api/gallery')
        ]);
        setAddedCards(servicesRes.data || []);
        setAddedServices(galleryRes.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => setPageLoaded(true), 200);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const handleServiceChange = (e) => {
    setServiceForm({
      ...serviceForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardChange = (e) => {
    const { name, value, files } = e.target;
    setCardForm({
      ...cardForm,
      [name]: files ? files[0] : value,
    });
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Submitting service form:', serviceForm);
      
      // Create service data with all required fields
      // name = short name (for selector), title = full name (for detail panel)
      const serviceData = {
        name: serviceForm.name, // Short name for selector
        title: serviceForm.title, // Full title for detail panel
        description: serviceForm.details,
        short: serviceForm.short, // Short description for detail panel
        features: serviceForm.features, // Features as comma-separated string
        price: 999,
        category: serviceForm.name.toLowerCase().replace(/\s+/g, "-"),
        image: "https://via.placeholder.com/400x300/00ff00/000000?text=" + encodeURIComponent(serviceForm.title)
      };

      console.log('Sending to backend:', serviceData);
      const response = await api.post('/api/services', serviceData);
      console.log('Response from backend:', response.data);
      
      setShowServiceSuccess(true);
      setTimeout(() => setShowServiceSuccess(false), 3000);

      // Refresh the services list
      const servicesRes = await api.get('/api/services');
      console.log('Refreshed services:', servicesRes.data);
      setAddedCards(servicesRes.data || []);

      // Reset form
      setServiceForm({
        name: "",
        title: "",
        short: "",
        details: "",
        features: "",
      });
    } catch (err) {
      console.error('Error adding service:', err);
      console.error('Error response:', err.response?.data);
      setServiceErrorMessage(err.response?.data?.message || 'Failed to add service');
      setShowServiceError(true);
      setTimeout(() => setShowServiceError(false), 3000);
    }
  };

  const handleCardSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Upload the image
      const imageFormData = new FormData();
      imageFormData.append('image', cardForm.image);
      imageFormData.append('title', cardForm.title);

      const uploadResponse = await api.post('/api/upload/image', imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Step 2: Create service card with the uploaded image URL
      const serviceData = {
        name: cardForm.title,
        description: cardForm.description,
        price: parseFloat(cardForm.price.replace(/[^0-9.]/g, '')) || 0,
        category: cardForm.category,
        image: uploadResponse.data.imageUrl
      };

      await api.post('/api/services', serviceData);

      setShowCardSuccess(true);
      setTimeout(() => setShowCardSuccess(false), 3000);

      // Refresh the services list
      const servicesRes = await api.get('/api/services');
      setAddedCards(servicesRes.data || []);

      // Reset form
      setCardForm({
        category: "soc",
        title: "",
        description: "",
        price: "",
        image: null,
      });
    } catch (err) {
      console.error('Error adding service card:', err);
      setCardErrorMessage(err.response?.data?.message || 'Failed to add service card');
      setShowCardError(true);
      setTimeout(() => setShowCardError(false), 3000);
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
      <div className="relative z-10 min-h-screen text-white">
        
        {/* Header */}
        <section className="pt-32 pb-12 px-6 text-center">
          <div className="flex justify-between items-center max-w-4xl mx-auto mb-4">
            <div className="flex-1">
              <h1
                className={`text-5xl font-bold text-green-400 mb-2 transition-all duration-1000 ${
                  pageLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-10"
                }`}
              >
                Admin Dashboard
              </h1>
              <p className="text-gray-400 text-lg">
                Manage Services and Service Cards
              </p>
            </div>
            <div className="flex items-center gap-4">
              {admin.username && (
                <span className="text-gray-300">
                  Welcome, <span className="text-green-400 font-semibold">{admin.username}</span>
                </span>
              )}
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 shadow-lg shadow-red-500/30"
              >
                Logout
              </button>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12 px-6">
          <button
            onClick={() => setActiveTab("add-service")}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === "add-service"
                ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            Add Service Category
          </button>
          <button
            onClick={() => setActiveTab("add-card")}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === "add-card"
                ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            Add Service Inside Category 
          </button>
        </div>

        {/* Forms Container */}
        <div className="max-w-4xl mx-auto px-6 pb-20">
          
          {/* Add Service Category Form */}
          {activeTab === "add-service" && (
            <div
              className={`glass-card backdrop-blur-xl bg-black/30 rounded-xl border border-white/20 shadow-2xl p-8 md:p-12 transition-all duration-700 ${
                pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl font-bold text-green-400 mb-2">
                Add New Service Category
              </h2>
              <p className="text-gray-400 mb-8">
                Create a new service category that will appear on the Services page
              </p>

              {showServiceSuccess && (
                <div className="mb-6 p-4 bg-green-600/20 border border-green-500 rounded-lg text-green-400">
                  ✓ Service category added successfully!
                </div>
              )}

              {showServiceError && (
                <div className="mb-6 p-4 bg-red-600/20 border border-red-500 rounded-lg text-red-400">
                  ✕ {serviceErrorMessage}
                </div>
              )}

              <form onSubmit={handleServiceSubmit} className="space-y-6">
                {/* Service Name */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Service Name (Short) *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={serviceForm.name}
                    onChange={handleServiceChange}
                    placeholder="e.g., SOC, VAPT"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500"
                  />
                </div>

                {/* Service Title */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Service Title (Full Name) *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={serviceForm.title}
                    onChange={handleServiceChange}
                    placeholder="e.g., Security Operations Center"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500"
                  />
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Short Description *
                  </label>
                  <textarea
                    name="short"
                    value={serviceForm.short}
                    onChange={handleServiceChange}
                    placeholder="Brief description for the card preview..."
                    required
                    rows="3"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500 resize-none"
                  />
                </div>

                {/* Detailed Description */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    name="details"
                    value={serviceForm.details}
                    onChange={handleServiceChange}
                    placeholder="Full description of the service..."
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500 resize-none"
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Features (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="features"
                    value={serviceForm.features}
                    onChange={handleServiceChange}
                    placeholder="e.g., 24/7 Monitoring, Real-Time Analysis, Incident Response"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-all duration-300 shadow-lg shadow-green-500/30"
                >
                  Add Service Category
                </button>
              </form>

              {/* Added Services List */}
              {addedServices.length > 0 && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">
                    Added Services (Session)
                  </h3>
                  <div className="space-y-3">
                    {addedServices.map((service, index) => (
                      <div
                        key={index}
                        className="bg-white/5 border border-white/10 rounded-lg p-4"
                      >
                        <p className="text-green-400 font-semibold">{service.name}</p>
                        <p className="text-gray-400 text-sm">{service.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Add Service Card Form */}
          {activeTab === "add-card" && (
            <div
              className={`glass-card backdrop-blur-xl bg-black/30 rounded-xl border border-white/20 shadow-2xl p-8 md:p-12 transition-all duration-700 ${
                pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl font-bold text-green-400 mb-2">
                Add New Service Card
              </h2>
              <p className="text-gray-400 mb-8">
                Add a product/card to an existing service category
              </p>

              {showCardSuccess && (
                <div className="mb-6 p-4 bg-green-600/20 border border-green-500 rounded-lg text-green-400">
                  ✓ Service card added successfully!
                </div>
              )}

              {showCardError && (
                <div className="mb-6 p-4 bg-red-600/20 border border-red-500 rounded-lg text-red-400">
                  ✕ {cardErrorMessage}
                </div>
              )}

              <form onSubmit={handleCardSubmit} className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Select Service Category *
                  </label>
                  <select
                    name="category"
                    value={cardForm.category}
                    onChange={handleCardChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 text-white"
                  >
                    <option value="soc" className="bg-gray-800">SOC - Security Operations Center</option>
                    <option value="vapt" className="bg-gray-800">VAPT - Vulnerability Assessment & Penetration Testing</option>
                    <option value="find-info" className="bg-gray-800">Find Info - Digital Exposure Monitoring</option>
                  </select>
                </div>

                {/* Card Title */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Card Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={cardForm.title}
                    onChange={handleCardChange}
                    placeholder="e.g., SOC Lite Monitoring"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500"
                  />
                </div>

                {/* Card Description */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Card Description *
                  </label>
                  <textarea
                    name="description"
                    value={cardForm.description}
                    onChange={handleCardChange}
                    placeholder="Describe what this service card offers..."
                    required
                    rows="4"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500 resize-none"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Price *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={cardForm.price}
                    onChange={handleCardChange}
                    placeholder="e.g., $999 / month"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">
                    Upload Image *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleCardChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-green-500 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700"
                    />
                  </div>
                  {cardForm.image && (
                    <div className="mt-3">
                      <p className="text-gray-400 text-sm mb-2">
                        Selected: {cardForm.image instanceof File ? cardForm.image.name : cardForm.image}
                      </p>
                      {cardForm.image instanceof File && (
                        <img
                          src={URL.createObjectURL(cardForm.image)}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg border border-white/20"
                        />
                      )}
                    </div>
                  )}
                  <p className="text-gray-500 text-sm mt-2">
                    Accepted formats: JPG, PNG, GIF, WebP
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-all duration-300 shadow-lg shadow-green-500/30"
                >
                  Add Service Card
                </button>
              </form>

              {/* Added Cards List */}
              {addedCards.length > 0 && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">
                    Added Cards (Session)
                  </h3>
                  <div className="space-y-3">
                    {addedCards.map((card, index) => (
                      <div
                        key={index}
                        className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-4"
                      >
                        {card.image && (
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <p className="text-green-400 font-semibold">{card.title}</p>
                          <p className="text-gray-400 text-sm">
                            Category: {card.category} | {card.price}
                          </p>
                          {card.imageName && (
                            <p className="text-gray-500 text-xs mt-1">
                              Image: {card.imageName}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          
        </div>
      </div>

      <Footer />
    </>
  );
}
