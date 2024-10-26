const express = require('express');
const router = express.Router();
const Client = require('../models/clients');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Both email and password are required!' });
  }

  try {
    console.log('email', email);
    const client = await Client.findOne({ email });
    if (!client) {
      console.log('Client not found!');
      return res.status(401).json({ message: 'Invalid credentials. Client not found!' });
    }

    const isMatch = await bcrypt.compare(password, client.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials. Incorrect password!' });
    }

    const token = jwt.sign(
      { id: client._id, email: client.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      client: client,
    });
  } catch (err) {
    console.error('Server Error: ', err.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
