const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));  // Serve frontend files

// Save text endpoint
app.post('/save-text', (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'No text provided' });

    fs.appendFile('recognizedText.txt', `${text}\n`, (err) => {
        if (err) return res.status(500).json({ error: 'Failed to save text' });
        res.json({ message: 'Text saved successfully' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});