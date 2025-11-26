/**
 * Day 21 - Challenge 2: Users Routes
 * Demonstrates POST data parsing with built-in middleware
 */

const express = require('express');
const router = express.Router();

// In-memory users store
let users = [];
let nextId = 1;

// GET /users - List all users
router.get('/', (req, res) => {
    res.json({
        success: true,
        count: users.length,
        data: users
    });
});

// POST /users - Create new user (Challenge 2)
router.post('/', (req, res) => {
    const { name, email, role } = req.body;
    
    // Basic validation
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            error: 'Name and email are required'
        });
    }
    
    // Check for duplicate email
    if (users.some(u => u.email === email)) {
        return res.status(400).json({
            success: false,
            error: 'Email already exists'
        });
    }
    
    const newUser = {
        id: nextId++,
        name,
        email,
        role: role || 'student',
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    res.status(201).json({
        message: 'User created successfully',
        data: newUser
    });
});

// GET /users/:id - Get user by ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    
    if (!user) {
        return res.status(404).json({
            success: false,
            error: 'User not found'
        });
    }
    
    res.json({
        success: true,
        data: user
    });
});

module.exports = router;
