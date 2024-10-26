const mongoose = require('mongoose');

const advocateSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  areaOfExpertise: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  });

const Advocate = mongoose.model('adv_profile', advocateSchema);
module.exports = Advocate;
