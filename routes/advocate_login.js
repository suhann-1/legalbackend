const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Advocate = require('../models/advocates');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Both email and password are required!' });
    }

    try {
        const advocate = await Advocate.findOne({ email });
        if (!advocate) {
            console.log('advocate not found!');
            return res.status(401).json({ message: 'Invalid credentials. Advocate not found!' });
        }

        const isMatch = await bcrypt.compare(password, advocate.password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials. Incorrect password!' });
        }

        const payload = {
            advocate: {
                id: advocate._id
            }
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
        );


        return res.status(200).json({
            message: 'Login successful',
            token,
            advocate: advocate,
        });
    } catch (err) {
        console.error('Server Error: ', err.message);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
