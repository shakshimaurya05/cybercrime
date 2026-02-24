const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  getServicesByCategory,
  createService,
  updateService,
  deleteService
} = require('../controllers/service');

// Get all services - GET /api/services
router.get('/', getAllServices);

// Get services by category - GET /api/services/category/:category
router.get('/category/:category', getServicesByCategory);

// Get single service by ID - GET /api/services/:id
router.get('/:id', getServiceById);

// Create new service - POST /api/services
router.post('/', createService);

// Update service - PUT /api/services/:id
router.put('/:id', updateService);

// Delete service - DELETE /api/services/:id
router.delete('/:id', deleteService);

module.exports = router;