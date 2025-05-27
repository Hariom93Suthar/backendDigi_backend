const {Enquiry,CustomEnquiry} = require("../../../models/serviceModel/appDevModel/enquryModel");

// POST /enquiry/app-development
const createFixedEnquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      duration,
      installment,
      description,
      budget,
      expectedStart,
    } = req.body;

    if (!name || !email || !phone || !installment || !budget || !description) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }
    
   const existing = await Enquiry.findOne({
  $or: [
    { email },
    { phone },
  ]
});

if (existing) {
  let message = "";
  if (existing.email === email) {
    message = "Email already exists. Please try a different one.";
  } else if (existing.phone === phone) {
    message = "Phone number already exists. Please try a different one.";
  } 
  return res.status(400).json({ error: true, message });
}


    const newEnquiry = await Enquiry.create({
      name,
      email,
      phone,
      duration,
      installment,
      description,
      budget,
      expectedStart,
    });

    res.status(201).json({ success: true, message: "Enquiry submitted successfully", data: newEnquiry });
  } catch (error) {
    console.error("Enquiry creation failed:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const createCustomEnquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      projectType,
      features,
      duration,
      installment,
      description,
      budget,
      expectedStart,
    } = req.body;

    if (!name || !email || !phone || !projectType || !queryType || !description) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }
    
   const existing = await CustomEnquiry.findOne({
  $or: [
    { email },
    { phone },
  ]
});

if (existing) {
  let message = "";
  if (existing.email === email) {
    message = "Email already exists. Please try a different one.";
  } else if (existing.phone === phone) {
    message = "Phone number already exists. Please try a different one.";
  } 
  return res.status(400).json({ error: true, message });
}


    const newEnquiry = await CustomEnquiry.create({
      name,
      email,
      phone,
      duration,
      installment,
      description,
      budget,
      expectedStart,
    });

    res.status(201).json({ success: true, message: "Enquiry submitted successfully", data: newEnquiry });
  } catch (error) {
    console.error("Enquiry creation failed:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAppDevelopmentService = async (req, res) => {
  try {
    const service = await Enquiry.find();

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    res.status(200).json({ success: true, data: service});
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getAppFixedService = async (req, res) => {
  try {
    const service = await CustomEnquiry.find();

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    res.status(200).json({ success: true, data: service});
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// UPDATE enquiry by ID
const updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Enquiry.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }

    res.status(200).json({ success: true, message: "Enquiry updated", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateCustomEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await CustomEnquiry.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }

    res.status(200).json({ success: true, message: "Enquiry updated", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE enquiry by ID
const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Enquiry.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }

    res.status(200).json({ success: true, message: "Enquiry deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteCustomEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CustomEnquiry.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }

    res.status(200).json({ success: true, message: "Enquiry deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = {
  createFixedEnquiry,
  createCustomEnquiry,
  getAppDevelopmentService,
  getAppFixedService,
  updateEnquiry,
  updateCustomEnquiry,
  deleteEnquiry,
  deleteCustomEnquiry
};
