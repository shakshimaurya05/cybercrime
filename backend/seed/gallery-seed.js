const mongoose = require("mongoose");
require("dotenv").config();

const Gallery = require("../models/Gallery");

const galleryImages = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    filename: "soc-monitoring-new",
    title: "SOC 24/7 Monitoring Center",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    filename: "vapt-testing",
    title: "Penetration Testing Lab",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    filename: "security-dashboard",
    title: "Security Analysis Dashboard",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    filename: "threat-detection",
    title: "Threat Detection System",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    filename: "cyber-ops",
    title: "Cybersecurity Operations",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    filename: "data-protection",
    title: "Data Protection & Privacy",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    filename: "network-security",
    title: "Network Security Monitoring",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    filename: "cloud-security",
    title: "Cloud Infrastructure Security",
  },
];

const seedGallery = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB Connected");

    // Clear existing gallery (delete ALL including localhost images)
    await Gallery.deleteMany({});
    console.log("🗑️  Existing gallery cleared (including localhost images)");

    // Insert new images (only Unsplash URLs)
    const inserted = await Gallery.insertMany(galleryImages);
    console.log(`✅ ${inserted.length} images seeded successfully`);

    inserted.forEach((img) => {
      console.log(`   - ${img.title}`);
    });

    console.log("\nℹ️  Gallery updated! All images now use HTTPS URLs.");
    console.log("🔄 Render will auto-deploy in 2-3 minutes.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding gallery:", error.message);
    process.exit(1);
  }
};

seedGallery();
