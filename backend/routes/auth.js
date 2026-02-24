const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/auth');

// Register route - POST /api/auth/register
router.post('/register', registerAdmin);

// Login route - POST /api/auth/login
router.post('/login', loginAdmin);

module.exports = router;