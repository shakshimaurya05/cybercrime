const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/serviceCategory');

// Get all categories - GET /api/categories
router.get('/', getAllCategories);

// Get category by name - GET /api/categories/name/:name
router.get('/name/:name', getCategoryByName);

// Get single category by ID - GET /api/categories/:id
router.get('/:id', getCategoryById);

// Create new category - POST /api/categories
router.post('/', createCategory);

// Update category - PUT /api/categories/:id
router.put('/:id', updateCategory);

// Delete category - DELETE /api/categories/:id
router.delete('/:id', deleteCategory);

module.exports = router;