const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes = require('./routes/auth');
const serviceCategoryRoutes = require('./routes/serviceCategory');
const serviceCardRoutes = require('./routes/serviceCard');
const uploadRoutes = require('./routes/upload');
const galleryRoutes = require('./routes/Gallery');

app.use('/api/auth', authRoutes);
app.use('/api/categories', serviceCategoryRoutes);
app.use('/api/cards', serviceCardRoutes);
app.use('/api/services', serviceCardRoutes);  // Alias for backward compatibility
app.use('/api/upload', uploadRoutes);
app.use('/api/gallery', galleryRoutes);

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MONGODB Connected'))
  .catch(err => console.log('MONGODB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});