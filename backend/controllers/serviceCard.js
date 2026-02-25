const ServiceCard = require('../models/ServiceCard');

// Get all service cards
exports.getAllServiceCards = async (req, res) => {
  try {
    const cards = await ServiceCard.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single card by ID
exports.getServiceCardById = async (req, res) => {
  try {
    const card = await ServiceCard.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Service card not found' });
    }
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get cards by category
exports.getServiceCardsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const cards = await ServiceCard.find({ category, isActive: true }).sort({ createdAt: -1 });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new service card
exports.createServiceCard = async (req, res) => {
  try {
    const { category, title, description, price, image, features } = req.body;

    if (!category || !title || !description || !price || !image) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const card = new ServiceCard({ 
      category, 
      title, 
      description, 
      price, 
      image,
      features
    });
    await card.save();

    res.status(201).json({ message: 'Service card created successfully', card });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update service card
exports.updateServiceCard = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const card = await ServiceCard.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!card) {
      return res.status(404).json({ message: 'Service card not found' });
    }

    res.status(200).json({ message: 'Service card updated successfully', card });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete service card
exports.deleteServiceCard = async (req, res) => {
  try {
    const { id } = req.params;

    const card = await ServiceCard.findByIdAndDelete(id);

    if (!card) {
      return res.status(404).json({ message: 'Service card not found' });
    }

    res.status(200).json({ message: 'Service card deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};