const express = require('express');
const router = express.Router();
const {
  getAllServiceCards,
  getServiceCardById,
  getServiceCardsByCategory,
  createServiceCard,
  updateServiceCard,
  deleteServiceCard
} = require('../controllers/serviceCard');

// Get all service cards - GET /api/cards
router.get('/', getAllServiceCards);

// Get cards by category - GET /api/cards/category/:category
router.get('/category/:category', getServiceCardsByCategory);

// Get single card by ID - GET /api/cards/:id
router.get('/:id', getServiceCardById);

// Create new card - POST /api/cards
router.post('/', createServiceCard);

// Update card - PUT /api/cards/:id
router.put('/:id', updateServiceCard);

// Delete card - DELETE /api/cards/:id
router.delete('/:id', deleteServiceCard);

module.exports = router;