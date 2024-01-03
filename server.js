
const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON bodies
app.use(express.json());

// Store the latest webhook data
let latestData = null;

// Webhook endpoint for Strapi
app.post('/webhook', (req, res) => {
    console.log('Webhook received:', req.body);
    latestData = req.body; // Store the latest data
    res.status(200).send('Webhook received');
});

// Endpoint for the frontend to poll
app.get('/poll', (req, res) => {
    res.json(latestData); // Send the latest data
});

app.get('/', (req, res) => {
    res.send('Webhook Server is running!');
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
