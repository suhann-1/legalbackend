const mongoose = require('mongoose');

const advocateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    expertise:
    {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
});

const Advocate = mongoose.model('advocates', advocateSchema);

module.exports = Advocate;
