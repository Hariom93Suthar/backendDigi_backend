// controllers/onboardingController.js
const Onboarding = require('../models/onboarding');

// Create
exports.createOnboarding = async (req, res) => {
  try {
    const { image, title, description } = req.body;
    const newEntry = new Onboarding({ image, title, description });
    await newEntry.save();
    res.status(201).json({ message: "Onboarding item created", data: newEntry });
  } catch (err) {
    res.status(500).json({ message: "Error creating onboarding", error: err.message });
  }
};


// Read All
exports.getAllOnboardings = async (req, res) => {
  try {
    const data = await Onboarding.find({ isActive: true });
    res.status(200).json({ message: "All onboarding data", data });
  } catch (err) {
    res.status(500).json({ message: "Error fetching onboarding data", error: err.message });
  }
};


// Update
exports.updateOnboarding = async (req, res) => {
  try {
    const updated = await Onboarding.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Updated successfully", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Update error", error: err.message });
  }
};


// Delete
exports.deleteOnboarding = async (req, res) => {
  try {
    await Onboarding.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete error", error: err.message });
  }
};
