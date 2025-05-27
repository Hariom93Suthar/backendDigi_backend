// models/Onboarding.js
const mongoose = require('mongoose');

const onboardingSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('OnboardingData', onboardingSchema);
