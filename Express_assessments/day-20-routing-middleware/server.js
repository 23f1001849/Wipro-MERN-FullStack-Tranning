/**
 * Day 20 - Basic Routing & Route Middleware
 * SkillSphere LMS API - Course Management
 */

const express = require('express');
const coursesRouter = require('./routes/courses');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Challenge 1: Basic Route Setup
app.get('/', (req, res) => {
    res.send('Welcome to SkillSphere LMS API');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'SkillSphere LMS',
        timestamp: new Date().toISOString()
    });
});

// Mount course routes with middleware
app.use('/courses', coursesRouter);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        path: req.originalUrl
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ 
        error: err.message || 'Internal Server Error' 
    });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`SkillSphere LMS API running on http://localhost:${PORT}`);
        console.log(`Courses available at http://localhost:${PORT}/courses`);
    });
}

module.exports = app;
