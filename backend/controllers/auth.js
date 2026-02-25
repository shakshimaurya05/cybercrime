const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Register new admin
exports.registerAdmin = async (req, res) => {
  try {
    const { username, password, secretKey } = req.body;

    // Check if all fields are provided
    if (!username || !password || !secretKey) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Verify secret key
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: 'Invalid secret key' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create new admin (password auto-hashed by model)
    const admin = new Admin({ username, password });
    await admin.save();

    // Send success response
    res.status(201).json({ message: 'Admin registered successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login admin
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if fields are provided
    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }  // 30 days
    );

    // Send success response with token
    res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


