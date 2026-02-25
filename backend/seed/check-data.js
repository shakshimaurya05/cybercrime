const mongoose = require('mongoose');
require('dotenv').config();

const Service = require('../models/ServiceCard');
const Gallery = require('../models/Gallery');

const checkData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ MongoDB Connected\n');

    // Check Services
    const services = await Service.find();
    console.log('📦 SERVICES:');
    if (services.length === 0) {
      console.log('   ❌ No services found');
    } else {
      services.forEach(s => {
        console.log(`   - ${s.name} (${s.category}): ${s.title}`);
        console.log(`     Features: ${s.features.length} items`);
        console.log(`     Price: ₹${s.price}`);
      });
      console.log(`\n   ✅ Total: ${services.length} services`);
    }

    // Check Gallery
    const gallery = await Gallery.find();
    console.log('\n🖼️  GALLERY:');
    if (gallery.length === 0) {
      console.log('   ❌ No images found');
    } else {
      gallery.forEach(g => {
        console.log(`   - ${g.title}`);
      });
      console.log(`\n   ✅ Total: ${gallery.length} images`);
    }

    // Category-wise breakdown
    console.log('\n📊 CATEGORY BREAKDOWN:');
    const categories = ['soc', 'vapt', 'find-info'];
    for (const cat of categories) {
      const count = await Service.countDocuments({ category: cat });
      console.log(`   ${cat}: ${count} services`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkData();
