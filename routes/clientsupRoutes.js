const express = require('express');
const router = express.Router();
const Client = require('../models/clients'); 
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    let client = await Client.findOne({ email });
    if (client) {
      return res.status(400).json({ msg: 'Client already exists' });
    }

    client = new Client({
      fullName,
      email,
      password: await bcrypt.hash(password, 10), 
    });

    await client.save();
    res.status(201).json({ msg: 'Client profile created successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
