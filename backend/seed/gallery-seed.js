const mongoose = require('mongoose');
require('dotenv').config();

const Gallery = require('../models/Gallery');

// Empty gallery - Admin will upload images via dashboard
const galleryImages = [];

const seedGallery = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ MongoDB Connected');

    // Clear existing gallery
    await Gallery.deleteMany({});
    console.log('🗑️  Existing gallery cleared');

    console.log('ℹ️  Gallery is empty. Admin can upload images via dashboard.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding gallery:', error.message);
    process.exit(1);
  }
};

seedGallery();
