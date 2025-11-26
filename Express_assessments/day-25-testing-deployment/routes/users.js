/**
 * Users API Routes
 */

const express = require('express');
const router = express.Router();

// In-memory data
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'instructor' }
];

let nextId = 3;

// GET /api/users
router.get('/', (req, res) => {
    res.json({
        success: true,
        count: users.length,
        data: users
    });
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    
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

// POST /api/users
router.post('/', (req, res) => {
    const { name, email, role } = req.body;
    
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
        role: role || 'student'
    };
    
    users.push(newUser);
    
    res.status(201).json({
        success: true,
        message: 'User created',
        data: newUser
    });
});

// PUT /api/users/:id
router.put('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    
    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'User not found'
        });
    }
    
    const { name, email, role } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            error: 'Name and email are required'
        });
    }
    
    users[userIndex] = {
        id: parseInt(req.params.id),
        name,
        email,
        role: role || 'student'
    };
    
    res.json({
        success: true,
        message: 'User updated',
        data: users[userIndex]
    });
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    
    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'User not found'
        });
    }
    
    const deleted = users.splice(userIndex, 1)[0];
    
    res.json({
        success: true,
        message: 'User deleted',
        data: deleted
    });
});

// Export for testing
router.resetData = () => {
    users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'instructor' }
    ];
    nextId = 3;
};

module.exports = router;
