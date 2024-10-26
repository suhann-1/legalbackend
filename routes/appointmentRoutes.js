const express = require('express');
const Appointment = require('../models/appointment');

const router = express.Router();

router.post('/create', async (req, res) => {
  const { name, phone, advocateId,date, time } = req.body;

  if (!name || !phone || !date || !time ) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newAppointment = new Appointment({
      name,
      phone,
      date,
      time,
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully!' });
  } catch (err) {
    console.error('Error booking appointment:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/list', async (req, res) => {
  const advocateId = req.query.id;
  if (!advocateId) {
    return res.status(400).json({ message: 'id is required' });
  }
  try {
    const appointments = await Appointment.find({ advocateId: advocateId });
    res.status(200).json({ appointments: appointments });
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
