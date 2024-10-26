const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Advocate = require('../models/advocates');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, email, password, expertise, experience } = req.body;

    try {
        let advocate = await Advocate.findOne({ email });
        if (advocate) {
            return res.status(400).json({ msg: 'Advocate already exists' });
        }

        advocate = new Advocate({
            name,
            email,
            password,
            expertise,
            experience
        });

        const salt = await bcrypt.genSalt(10);
        advocate.password = await bcrypt.hash(password, salt);
        await advocate.save();
        let data = {
            message: "Advocate profile created successfully",
        }
        res.status(201).send(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
