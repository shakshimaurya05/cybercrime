const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
 category: {
  type: String,
  required: true,
  trim: true,
  lowercase: true
},
  image: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;