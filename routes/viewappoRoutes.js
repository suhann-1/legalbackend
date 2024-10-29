const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ClientAppointment = require('../models/viewappoclients'); // Adjusted to the correct path

// Create a new appointment
router.post('/client', async (req, res) => {
    try {
        
        const newAppointment = new ClientAppointment({
            advocateId:req.body.advocateId,
            clientId:req.body.clientId,
            clientName:req.body.name,
            clientEmail:req.body.email,
            appointmentDate:req.body.date,
            status:'Pending'
        });

        const savedAppointment = await newAppointment.save();
        res.status(201).json({ success: true, data: savedAppointment });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ success: false, message: 'Failed to create appointment', error: error.message });
    }
});

// Get all appointments for a specific advocate
// router.get('/clients', async (req, res) => {
//   try {
//       const advocateId = req.query.id;
//       if (!mongoose.isValidObjectId(advocateId)) {
//           return res.status(400).json({ success: false, message: 'Invalid advocate ID' });
//       }

//       const appointments = await Appointment.find({ advocateId });
//       res.status(200).json({ success: true, data: appointments });
//   } catch (error) {
//       console.error('Error fetching appointments:', error);
//       res.status(500).json({ success: false, message: 'Failed to fetch appointments', error: error.message });
//   }
// });
router.get('/clients', async (req, res) => {
    try {
        const advocateId = req.query.id;
        if (!mongoose.isValidObjectId(advocateId)) {
            return res.status(400).json({ success: false, message: 'Invalid advocate ID' });
        }
  console.log(advocateId)
        const appointments = await ClientAppointment.find({ advocateId });
        res.status(200).json({ success: true, data: appointments });
        console.log(appointments)
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch appointments', error: error.message });
    }
  });

// Update an appointment by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAppointment = await ClientAppointment.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedAppointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        res.status(200).json({ success: true, data: updatedAppointment });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ success: false, message: 'Failed to update appointment', error: error.message });
    }
});

// Delete an appointment by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAppointment = await ClientAppointment.findByIdAndDelete(id);

        if (!deletedAppointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ success: false, message: 'Failed to delete appointment', error: error.message });
    }
});

module.exports = router;
