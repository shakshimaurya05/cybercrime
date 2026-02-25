const mongoose = require('mongoose');
require('dotenv').config();

const Gallery = require('../models/Gallery');

const galleryImages = [
  {
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    filename: "soc-monitoring.jpg",
    title: "SOC 24/7 Monitoring Center"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    filename: "vapt-testing.jpg",
    title: "Penetration Testing Lab"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    filename: "security-analysis.jpg",
    title: "Security Analysis Dashboard"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
    filename: "threat-detection.jpg",
    title: "Threat Detection System"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    filename: "cyber-ops.jpg",
    title: "Cybersecurity Operations"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
    filename: "data-protection.jpg",
    title: "Data Protection & Privacy"
  },
  // NEW IMAGES
  {
    imageUrl: "https://images.unsplash.com/photo-1563206767-5b1d972e813e",
    filename: "network-security.jpg",
    title: "Network Security Monitoring"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef2bb21568c0",
    filename: "cloud-security.jpg",
    title: "Cloud Infrastructure Security"
  }
];

const seedGallery = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ MongoDB Connected');

    // Clear existing gallery
    await Gallery.deleteMany({});
    console.log('🗑️  Existing gallery cleared');

    // Insert new images
    const inserted = await Gallery.insertMany(galleryImages);
    console.log(`✅ ${inserted.length} images seeded successfully`);

    inserted.forEach(img => {
      console.log(`   - ${img.title}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding gallery:', error.message);
    process.exit(1);
  }
};

seedGallery();