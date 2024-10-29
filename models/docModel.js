const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    filePath: {
        type: String,
        required: true,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    advocateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Advocate',
        required: false, // Set to `true` if advocates upload the document
    },
    documentName: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    description: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Document', documentSchema);
