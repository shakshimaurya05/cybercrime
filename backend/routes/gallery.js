
const express = require('express');
const router = express.Router();
const {
  getAllGalleryImages,
  addGalleryImage,
  deleteGalleryImage
} = require('../controllers/gallery');
const { verifyToken } = require('../middleware/auth');

// Get all images - GET /api/gallery
router.get('/', getAllGalleryImages);

// Add image - POST /api/gallery (protected - needs login)
router.post('/', verifyToken, addGalleryImage);

// Delete image - DELETE /api/gallery/:id (protected - needs login)
router.delete('/:id', verifyToken, deleteGalleryImage);

module.exports = router;