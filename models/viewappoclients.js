// models/viewclientappo.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    advocateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    status: { type: String, enum: ['Confirmed', 'Pending', 'Cancelled'], required: true },
});

// Updated model name
module.exports = mongoose.model('ClientAppointment', appointmentSchema);
