/**
 * Day 19 - Express.js Fundamentals, Routing & Middleware
 * BookStore API - Complete Express Server with CRUD Operations
 */

const express = require('express');
const cors = require('cors');
const bookRouter = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 4000;

// Built-in Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Logging Middleware (Challenge 3)
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${req.method}] ${req.url} at ${timestamp}`);
    next();
};

app.use(requestLogger);

// Challenge 1: Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to Express Server');
});

// Challenge 1 Bonus: Status Route
app.get('/status', (req, res) => {
    res.json({ 
        server: 'running', 
        uptime: 'OK',
        timestamp: new Date().toISOString()
    });
});

// Challenge 2: Products Route with Query Parameters
app.get('/products', (req, res) => {
    const { name } = req.query;
    
    if (name) {
        // Bonus: Return JSON format
        res.json({ 
            message: `Searching for product: ${name}`,
            query: name 
        });
    } else {
        res.json({ message: 'Please provide a product name' });
    }
});

// Challenge 5: Modular Routing - Mount book routes
app.use('/books', bookRouter);

// Challenge 5: Global Error Handler - 404 Not Found
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Challenge 5 Bonus: Centralized Error Handler
app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    res.status(err.status || 500).json({ 
        error: err.message || 'Internal Server Error' 
    });
});

// Start server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`BookStore API Server running on http://localhost:${PORT}`);
        console.log(`Books API available at http://localhost:${PORT}/books`);
    });
}

module.exports = app;
