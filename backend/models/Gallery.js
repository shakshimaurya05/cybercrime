const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  title: {
    type: String,
    trim: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;