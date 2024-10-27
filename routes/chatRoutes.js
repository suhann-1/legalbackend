const express = require('express');
const ChatMessage = require('../models/chatModel'); // Adjust path as needed
const router = express.Router();

// Route to save a new message
router.post('/sendMessage', async (req, res) => {
  try {
    const { roomId, sender, content } = req.body;

    const newMessage = new ChatMessage({
      roomId,
      sender,
      content,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error saving message', error });
  }
});

// Route to retrieve messages for a specific room
router.get('/messages/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await ChatMessage.find({ roomId }).sort({ timestamp: 1 }); // Sort by timestamp
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving messages', error });
  }
});

// Route to delete a message by its ID (optional)
router.delete('/message/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ChatMessage.findByIdAndDelete(id);
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error });
  }
});

module.exports = router;
