const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    installment: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
    },
    expectedStart: {
      type: String,
    },
  },
  { timestamps: true }
);

const enquiryCustomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    projectType: {
      type: String,
      required: true,
    },
    features: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    budget: {
      type: Number,
      required:true,
    },
  
    installment: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  
    expectedStart: {
      type: String,
    },
  },
  { timestamps: true }
);



const Enquiry = mongoose.model("ApplicationDevFixedEnqueiry", enquirySchema);
const CustomEnquiry = mongoose.model("ApplicationDevCustomEnqueiry", enquiryCustomSchema);


module.exports = {
  Enquiry,
  CustomEnquiry,
}
