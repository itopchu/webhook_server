const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Include CORS

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Setup socket.io

const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors()); // Use CORS

// Middleware for parsing JSON bodies
app.use(express.json());
// Webhook endpoint for Strapi
app.post('/webhook', (req, res) => {
    console.log('Webhook received:', req.body);
    
    // Emit the data to all connected socket clients
    io.emit('postCreated', req.body);

    // Respond to the webhook
    res.status(200).send('Webhook received');
});

app.get('/', (req, res) => {
    res.send('Webhook Server is running!');
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
