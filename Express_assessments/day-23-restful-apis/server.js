/**
 * Day 23 - RESTful APIs & API Middleware
 * Course Management API with validation and rate limiting
 */

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const coursesRouter = require('./routes/courses');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 4000;

// CORS configuration
app.use(cors());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Challenge 3: API Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: 5, // 5 requests per window
    message: { 
        error: 'Too many requests',
        message: 'You have exceeded the 5 requests per minute limit. Please try again later.',
        retryAfter: '60 seconds'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Apply rate limiting to API routes
app.use('/api', apiLimiter);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to SkillSphere Course API',
        version: 'v1',
        endpoints: {
            courses: '/api/v1/courses',
            health: '/api/health'
        }
    });
});

// Health check (excluded from rate limiting)
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Best Practice: API Versioning
app.use('/api/v1/courses', coursesRouter);

// Also support non-versioned for simplicity
app.use('/api/courses', coursesRouter);

// 404 Handler
app.use(notFoundHandler);

// Centralized Error Handler
app.use(errorHandler);

// Start server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`SkillSphere API running on http://localhost:${PORT}`);
        console.log(`Courses API at http://localhost:${PORT}/api/v1/courses`);
        console.log(`Rate limit: 5 requests per minute`);
    });
}

module.exports = app;
