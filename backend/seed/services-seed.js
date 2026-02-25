const mongoose = require('mongoose');
require('dotenv').config();

const Service = require('../models/ServiceCard');

const services = [
  {
    title: "Security Operations Center",
    name: "soc",
    shortDescription: "Continuous 24/7 monitoring, detection and incident response.",
    detailedDescription: "Our SOC functions as a centralized cyber command infrastructure delivering real-time monitoring, SIEM log correlation, anomaly detection and rapid containment strategies for enterprise environments.",
    features: [
      "24/7 Threat Monitoring",
      "Real-Time Log Analysis",
      "Incident Response Execution",
      "SIEM Integration",
      "Threat Intelligence"
    ],
    category: "soc",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
    price: 7999
  },
  {
    title: "Vulnerability Assessment & Penetration Testing",
    name: "vapt",
    shortDescription: "Simulated attack testing to identify security weaknesses.",
    detailedDescription: "We conduct structured vulnerability scanning and controlled penetration testing to uncover exploitable flaws across applications, networks and cloud infrastructure.",
    features: [
      "Web & API Testing",
      "Cloud Infrastructure Review",
      "Risk Prioritization",
      "Remediation Guidance",
      "Compliance Testing"
    ],
    category: "vapt",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    price: 4999
  },
  {
    title: "Find Your Information",
    name: "find-info",
    shortDescription: "Digital exposure monitoring and breach intelligence.",
    detailedDescription: "We proactively monitor exposed credentials, leaked data and executive risk signals across surface, deep and dark web environments.",
    features: [
      "Dark Web Monitoring",
      "Credential Leak Detection",
      "Executive Risk Alerts",
      "Exposure Mitigation",
      "Breach Intelligence"
    ],
    category: "find-info",
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
    price: 1999
  }
];

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ MongoDB Connected');

    // Clear existing services
    await Service.deleteMany({});
    console.log('🗑️  Existing services cleared');

    // Insert new services
    const inserted = await Service.insertMany(services);
    console.log(`✅ ${inserted.length} services seeded successfully`);

    inserted.forEach(s => {
      console.log(`   - ${s.title} (${s.category})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding services:', error.message);
    process.exit(1);
  }
};

seedServices();