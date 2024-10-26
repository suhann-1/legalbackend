const express = require('express');
const router = express.Router();
const Client = require('../models/clients'); // Ensure this path is correct

// Route to fetch all clients
router.get('/view', async (req, res) => {
  try {
    const clients = await Client.find(); // Fetch all clients from the database
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ status: 'error', message: 'Server error. Please try again later.' });
  }
});

// Route to delete a client by ID
router.post('/delete', async (req, res) => {
  const { _id } = req.body; // Get client ID from the request body
  console.log("Received delete request for client ID:", _id);

  try {
    const deletedClient = await Client.findByIdAndDelete(_id); // Delete client by ID
    if (deletedClient) {
      res.json({ status: 'success', message: 'Client deleted successfully' });
    } else {
      console.error('Client not found with ID:', _id);
      res.status(404).json({ status: 'error', message: 'Client not found' });
    }
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

module.exports = router;
