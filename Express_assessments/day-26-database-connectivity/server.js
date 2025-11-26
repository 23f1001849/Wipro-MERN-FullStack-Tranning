/**
 * Day 26 - Database Connectivity
 * MySQL, MongoDB, and Sequelize ORM integration
 */

require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
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

// Import routes
const mysqlRouter = require('./routes/mysql');
const mongoRouter = require('./routes/mongodb');
const sequelizeRouter = require('./routes/sequelize');

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'SkillSphere Database Connectivity Demo',
        description: 'Demonstrating MySQL, MongoDB, and Sequelize ORM',
        endpoints: {
            mysql: '/api/mysql - MySQL integration',
            mongodb: '/api/mongodb - MongoDB with Mongoose',
            sequelize: '/api/sequelize - Sequelize ORM'
        },
        note: 'Configure database connections in .env file'
    });
});

// Health check
app.get('/status', (req, res) => {
    res.json({
        status: 'running',
        timestamp: new Date().toISOString(),
        databases: {
            mysql: process.env.MYSQL_HOST ? 'configured' : 'not configured',
            mongodb: process.env.MONGODB_URI ? 'configured' : 'not configured'
        }
    });
});

// Mount database routes
app.use('/api/mysql', mysqlRouter);
app.use('/api/mongodb', mongoRouter);
app.use('/api/sequelize', sequelizeRouter);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: err.message || 'Internal Server Error' 
    });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Database Demo running on http://localhost:${PORT}`);
        console.log(`MySQL at http://localhost:${PORT}/api/mysql`);
        console.log(`MongoDB at http://localhost:${PORT}/api/mongodb`);
        console.log(`Sequelize at http://localhost:${PORT}/api/sequelize`);
    });
}

module.exports = app;
