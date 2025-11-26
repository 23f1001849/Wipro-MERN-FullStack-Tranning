/**
 * Day 25 - Testing & Deployment
 * Production-ready API with test infrastructure
 */

const express = require('express');
const coursesRouter = require('./routes/courses');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check for deployment
app.get('/status', (req, res) => {
    res.json({
        status: 'App is live',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to SkillSphere API',
        endpoints: {
            status: '/status',
            courses: '/api/courses',
            users: '/api/users'
        }
    });
});

// API Routes
app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: process.env.NODE_ENV === 'production' 
            ? 'Internal Server Error' 
            : err.message 
    });
});

// Start server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`SkillSphere API running on http://localhost:${PORT}`);
        console.log(`Health check at http://localhost:${PORT}/status`);
    });
}

module.exports = app;
