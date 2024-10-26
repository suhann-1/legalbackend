const express = require('express');
const router = express.Router();
const Profile = require('../models/profadv'); 

router.get('/', async (req, res) => {
    try {
        const advocates = await Profile.find().select('-password'); // Exclude password
        res.status(200).json(advocates);
    } catch (err) {
        console.error('Error fetching advocates:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});
