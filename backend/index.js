
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');
const uploadRoutes = require('./routes/upload');
const galleryRoutes = require('./routes/Gallery');  

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/gallery', galleryRoutes);  

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MONGODB Connected'))
  .catch(err => console.log('MONGODB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});