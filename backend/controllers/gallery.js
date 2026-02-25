
const Gallery = require('../models/Gallery');

// Get all gallery images
exports.getAllGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ uploadedAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add image to gallery
exports.addGalleryImage = async (req, res) => {
  try {
    const { imageUrl, filename, title } = req.body;

    if (!imageUrl || !filename) {
      return res.status(400).json({ message: 'Image URL and filename are required' });
    }

    const image = new Gallery({ imageUrl, filename, title });
    await image.save();

    res.status(201).json({ message: 'Image added to gallery', image });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete image from gallery
exports.deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Gallery.findByIdAndDelete(id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.status(200).json({ message: 'Image deleted from gallery' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};