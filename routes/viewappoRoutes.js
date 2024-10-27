const express = require('express');
const router = express.Router();
const ClientAppointment = require('../models/viewappoclients'); // Adjust the path to your model

// Create a new appointment
router.post('/client', async (req, res) => {
    try {
        const { advocateId, clientId, clientName, clientEmail, appointmentDate, status } = req.body;

        const newAppointment = new ClientAppointment({
            advocateId,
            clientId,
            clientName,
            clientEmail,
            appointmentDate,
            status,
        });

        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ message: 'Failed to create appointment', error });
    }
});

// Get all appointments for a specific advocate
router.get('/clients', async (req, res) => {
    try {
        const advocateId = req.query.id;

        // Validate the advocateId
        if (!mongoose.isValidObjectId(advocateId)) {
            return res.status(400).json({ message: 'Invalid advocate ID' });
        }

        const appointments = await ClientAppointment.find({ advocateId: advocateId });

        res.status(200).json({
            success: true,
            data: appointments,
        });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch appointments', error });
    }
});

// Update an appointment by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAppointment = await ClientAppointment.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ message: 'Failed to update appointment', error });
    }
});

// Delete an appointment by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAppointment = await ClientAppointment.findByIdAndDelete(id);

        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ message: 'Failed to delete appointment', error });
    }
});

module.exports = router;