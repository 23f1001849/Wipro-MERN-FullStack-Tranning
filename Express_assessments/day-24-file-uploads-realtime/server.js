/**
 * Day 24 - File Uploads & Real-Time Communication
 * Course materials upload and live chat functionality
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const rateLimit = require('express-rate-limit');
const uploadRouter = require('./routes/upload');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 4000;

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests, please try again later.' }
});

// Apply rate limiting
app.use(limiter);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Challenge 2: Serve static files from uploads folder
app.use('/materials', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/upload', uploadRouter);

// Home route - Chat interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Info route
app.get('/api', (req, res) => {
    res.json({
        message: 'SkillSphere File Upload & Chat API',
        endpoints: {
            upload: 'POST /upload',
            materials: 'GET /materials/:filename',
            chat: 'WebSocket connection at /'
        }
    });
});

// Challenge 3: Real-Time Chat with Socket.io
const users = new Map();

io.on('connection', (socket) => {
    console.log(`👤 User connected: ${socket.id}`);
    
    // User joins chat
    socket.on('join', (username) => {
        users.set(socket.id, username);
        socket.broadcast.emit('user joined', {
            username,
            timestamp: new Date().toISOString()
        });
        
        // Send current users list
        io.emit('users list', Array.from(users.values()));
        
        console.log(`${username} joined the chat`);
    });
    
    // Handle chat messages
    socket.on('chat message', (data) => {
        const username = users.get(socket.id) || 'Anonymous';
        const message = {
            username,
            text: data.text,
            timestamp: new Date().toISOString()
        };
        
        // Broadcast to all connected clients
        io.emit('chat message', message);
        console.log(`${username}: ${data.text}`);
    });
    
    // Handle typing indicator
    socket.on('typing', () => {
        const username = users.get(socket.id);
        if (username) {
            socket.broadcast.emit('typing', { username });
        }
    });
    
    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing');
    });
    
    // Handle disconnect
    socket.on('disconnect', () => {
        const username = users.get(socket.id);
        if (username) {
            users.delete(socket.id);
            io.emit('user left', { username });
            io.emit('users list', Array.from(users.values()));
            console.log(`${username} left the chat`);
        }
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
    server.listen(PORT, () => {
        console.log(`SkillSphere running on http://localhost:${PORT}`);
        console.log(`Upload files at http://localhost:${PORT}/upload`);
        console.log(`Chat room at http://localhost:${PORT}`);
    });
}

module.exports = { app, server, io };
