/**
 * Authentication Routes
 * Register, Login, Logout, Dashboard
 */

const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();

const { ensureAuthenticated, ensureGuest } = require('../middleware/auth');
const { findUserByEmail, addUser } = require('../config/passport');

// GET /register - Registration page
router.get('/register', ensureGuest, (req, res) => {
    res.render('register', { title: 'Register' });
});

// POST /register - Handle registration (Challenge 1)
router.post('/register', ensureGuest, async (req, res) => {
    const { name, email, password, password2 } = req.body;
    const errors = [];
    
    // Validation
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }
    
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }
    
    if (password && password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    
    if (errors.length > 0) {
        return res.render('register', {
            title: 'Register',
            errors,
            name,
            email
        });
    }
    
    try {
        // Check if user exists
        const existingUser = await findUserByEmail(email);
        
        if (existingUser) {
            errors.push({ msg: 'Email is already registered' });
            return res.render('register', {
                title: 'Register',
                errors,
                name,
                email
            });
        }
        
        // Hash password (Best Practice: Always hash passwords)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create new user
        const newUser = {
            name,
            email,
            password: hashedPassword,
            role: 'student'
        };
        
        await addUser(newUser);
        
        req.flash('success_msg', `Registration successful for ${name}. Please log in.`);
        res.redirect('/login');
        
    } catch (error) {
        console.error(error);
        res.render('register', {
            title: 'Register',
            errors: [{ msg: 'An error occurred during registration' }],
            name,
            email
        });
    }
});

// GET /login - Login page
router.get('/login', ensureGuest, (req, res) => {
    res.render('login', { title: 'Login' });
});

// POST /login - Handle login (Challenge 3)
router.post('/login', ensureGuest, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

// GET /dashboard - Protected route
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard',
        user: req.user
    });
});

// GET /logout - Logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'You have been logged out');
        res.redirect('/login');
    });
});

module.exports = router;
