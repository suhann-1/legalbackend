const express = require('express');
const multer = require('multer');
const fs = require('fs');
const Document = require('../models/docModel');
const router = express.Router();

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Route to upload a document
router.post('/upload', upload.single('document'), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    try {
        const document = new Document({
            filePath: req.file.path,
            clientId: req.body.clientId,
            advocateId: req.body.advocateId || null, // Optional if linked to an advocate
            documentName: req.file.originalname,
            description: req.body.description || '',
        });

        await document.save();
        res.status(201).json({ message: 'Document uploaded successfully', document });
    } catch (error) {
        res.status(500).json({ message: 'Error saving document metadata', error });
    }
});

// Route to get all documents for a specific client
router.get('/client/:clientId', async (req, res) => {
    try {
        const documents = await Document.find({ clientId: req.params.clientId });
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving documents', error });
    }
});

// Route to get all documents for a specific advocate
router.get('/advocate/:advocateId', async (req, res) => {
    try {
        const documents = await Document.find({ advocateId: req.params.advocateId });
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving documents', error });
    }
});

// Route to delete a document by ID
router.delete('/:documentId', async (req, res) => {
    try {
        const document = await Document.findById(req.params.documentId);
        if (!document) return res.status(404).json({ message: 'Document not found' });

        // Delete the file from the filesystem
        fs.unlink(document.filePath, (err) => {
            if (err) return res.status(500).json({ message: 'File deletion failed', err });
        });

        await Document.findByIdAndDelete(req.params.documentId);
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting document', error });
    }
});

module.exports = router;
