

const mongoose = require('mongoose');
require('dotenv').config();

const ServiceCategory = require('../models/ServiceCategory');
const ServiceCard = require('../models/ServiceCard');

// Categories Data
const categories = [
  {
    name: "soc",
    title: "Security Operations Center",
    shortDescription: "Continuous 24/7 monitoring, detection and incident response.",
    detailedDescription: "Our SOC functions as a centralized cyber command infrastructure delivering real-time monitoring, SIEM log correlation, anomaly detection and rapid containment strategies for enterprise environments.",
    features: [
      "24/7 Threat Monitoring",
      "Real-Time Log Analysis",
      "Incident Response Execution",
      "SIEM Integration",
      "Threat Intelligence"
    ],
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769"
  },
  {
    name: "vapt",
    title: "Vulnerability Assessment & Penetration Testing",
    shortDescription: "Simulated attack testing to identify security weaknesses.",
    detailedDescription: "We conduct structured vulnerability scanning and controlled penetration testing to uncover exploitable flaws across applications, networks and cloud infrastructure.",
    features: [
      "Web & API Testing",
      "Cloud Infrastructure Review",
      "Risk Prioritization",
      "Remediation Guidance",
      "Compliance Testing"
    ],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
  },
  {
    name: "find-info",
    title: "Find Your Information",
    shortDescription: "Digital exposure monitoring and breach intelligence.",
    detailedDescription: "We proactively monitor exposed credentials, leaked data and executive risk signals across surface, deep and dark web environments.",
    features: [
      "Dark Web Monitoring",
      "Credential Leak Detection",
      "Executive Risk Alerts",
      "Exposure Mitigation",
      "Breach Intelligence"
    ],
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72"
  }
];

// Service Cards Data (Products under each category)
const serviceCards = [
  // SOC Cards
  {
    category: "soc",
    title: "SOC Lite Monitoring",
    description: "Real-time log monitoring with AI-powered alerting and compliance-ready reporting dashboards.",
    price: 999,
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
    features: ["24/7 Monitoring", "Log Analysis", "Alert System"]
  },
  {
    category: "soc",
    title: "SOC Enterprise Suite",
    description: "Full security operations automation with advanced threat intelligence integration and active response orchestration.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    features: ["Threat Intelligence", "Auto Response", "SIEM Integration"]
  },
  
  // VAPT Cards
  {
    category: "vapt",
    title: "Web Application VAPT",
    description: "In-depth web app penetration testing covering OWASP Top 10 and business logic vulnerabilities.",
    price: 1499,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    features: ["OWASP Testing", "Business Logic", "Detailed Report"]
  },
  {
    category: "vapt",
    title: "Cloud Security Audit",
    description: "Advanced AWS/Azure cloud misconfiguration assessment with risk prioritization and remediation roadmap.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    features: ["AWS/Azure", "Risk Assessment", "Remediation Plan"]
  },
  
  // Find Info Cards
  {
    category: "find-info",
    title: "Dark Web Exposure Scan",
    description: "Automated scanning of breach databases and dark web marketplaces for exposed credentials.",
    price: 799,
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
    features: ["Breach Database", "Dark Web Scan", "Credential Check"]
  },
  {
    category: "find-info",
    title: "Executive Risk Shield",
    description: "Continuous monitoring of executive digital exposure with personalized threat alerts.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    features: ["Executive Monitoring", "Threat Alerts", "Risk Reports"]
  }
];

const seedNewSchema = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ MongoDB Connected\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await ServiceCategory.deleteMany({});
    console.log('   - Categories cleared');
    
    await ServiceCard.deleteMany({});
    console.log('   - Service cards cleared\n');

    // Seed Categories
    console.log('📦 Seeding Categories...');
    const categoriesInserted = await ServiceCategory.insertMany(categories);
    console.log(`   ✅ ${categoriesInserted.length} categories added`);
    categoriesInserted.forEach(cat => {
      console.log(`      - ${cat.title} (${cat.name})`);
    });

    // Seed Service Cards
    console.log('\n🃏 Seeding Service Cards...');
    const cardsInserted = await ServiceCard.insertMany(serviceCards);
    console.log(`   ✅ ${cardsInserted.length} cards added`);
    cardsInserted.forEach(card => {
      console.log(`      - ${card.title} (${card.category})`);
    });

    console.log('\n✅ All data seeded successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    process.exit(1);
  }
};

seedNewSchema();