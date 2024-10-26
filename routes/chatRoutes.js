const express = require('express');
const Message = require('../models/Message'); // Assuming Message model is inside models folder
const router = express.Router();

// Fetch chat history
router.get('/history', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 }); // Sort messages by timestamp
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

module.exports = router;
