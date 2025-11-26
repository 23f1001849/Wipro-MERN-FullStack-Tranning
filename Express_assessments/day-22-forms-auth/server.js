/**
 * Day 22 - Forms, Database, and Authentication
 * Complete authentication system with RBAC
 */

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
const rateLimit = require('express-rate-limit');

// Import configurations
const connectDB = require('./config/database');
const configurePassport = require('./config/passport');

// Import routes
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 4000;

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests, please try again later.' }
});

// Apply rate limiting to all routes
app.use(limiter);

// Connect to MongoDB (if MONGODB_URI is set)
if (process.env.MONGODB_URI) {
    connectDB();
}

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'skillsphere-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure: process.env.NODE_ENV === 'production', // Enable secure cookies in production
        httpOnly: true // Prevent XSS
    }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

// Flash messages
app.use(flash());

// Global variables for templates
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Home route
app.get('/', (req, res) => {
    res.render('home', { title: 'SkillSphere LMS' });
});

// Mount routes
app.use('/', authRouter);
app.use('/admin', adminRouter);

// 404 Handler
app.use((req, res) => {
    res.status(404).render('error', {
        title: 'Page Not Found',
        message: 'The page you are looking for does not exist.',
        status: 404
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        title: 'Server Error',
        message: err.message || 'Something went wrong!',
        status: 500
    });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`SkillSphere LMS running on http://localhost:${PORT}`);
        console.log(`Register at http://localhost:${PORT}/register`);
        console.log(`Login at http://localhost:${PORT}/login`);
    });
}

module.exports = app;
