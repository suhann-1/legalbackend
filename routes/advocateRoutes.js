const express = require('express');
const router = express.Router();
const Advocate = require('../models/advocates'); 

// Route to fetch all advocates
router.get('/', async (req, res) => {
  try {
    const advocates = await Advocate.find();
    res.status(200).json(advocates);
  } catch (err) {
    console.error('Error fetching advocates:', err);
    res.status(500).json({ status: 'error', message: 'Server error. Please try again later.' });
  }
});



module.exports = router;
