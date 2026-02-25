const express = require('express');
const router = express.Router();
const {
  createContact,
  getAllContacts,
  updateContactStatus,
  deleteContact
} = require('../controllers/contact');
const { verifyToken } = require('../middleware/auth');

// Create contact inquiry - POST /api/contact (public)
router.post('/', createContact);

// Get all contact inquiries - GET /api/contact (protected - admin only)
router.get('/', verifyToken, getAllContacts);

// Update contact status - PUT /api/contact/:id (protected - admin only)
router.put('/:id', verifyToken, updateContactStatus);

// Delete contact inquiry - DELETE /api/contact/:id (protected - admin only)
router.delete('/:id', verifyToken, deleteContact);

module.exports = router;
