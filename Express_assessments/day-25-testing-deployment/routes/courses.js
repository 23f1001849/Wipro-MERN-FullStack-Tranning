/**
 * Courses API Routes
 */

const express = require('express');
const router = express.Router();

// In-memory data
let courses = [
    { id: 1, name: 'React Mastery', duration: '6 weeks', price: 299 },
    { id: 2, name: 'Node.js Fundamentals', duration: '4 weeks', price: 199 },
    { id: 3, name: 'Full Stack Development', duration: '12 weeks', price: 499 }
];

let nextId = 4;

// GET /api/courses
router.get('/', (req, res) => {
    res.json({
        success: true,
        count: courses.length,
        data: courses
    });
});

// GET /api/courses/:id
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    if (!course) {
        return res.status(404).json({
            success: false,
            error: 'Course not found'
        });
    }
    
    res.json({
        success: true,
        data: course
    });
});

// POST /api/courses
router.post('/', (req, res) => {
    const { name, duration, price } = req.body;
    
    if (!name || !duration) {
        return res.status(400).json({
            success: false,
            error: 'Name and duration are required'
        });
    }
    
    const newCourse = {
        id: nextId++,
        name,
        duration,
        price: price || 0
    };
    
    courses.push(newCourse);
    
    res.status(201).json({
        success: true,
        message: 'Course created',
        data: newCourse
    });
});

// PUT /api/courses/:id
router.put('/:id', (req, res) => {
    const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));
    
    if (courseIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Course not found'
        });
    }
    
    const { name, duration, price } = req.body;
    
    if (!name || !duration) {
        return res.status(400).json({
            success: false,
            error: 'Name and duration are required'
        });
    }
    
    courses[courseIndex] = {
        id: parseInt(req.params.id),
        name,
        duration,
        price: price || 0
    };
    
    res.json({
        success: true,
        message: 'Course updated',
        data: courses[courseIndex]
    });
});

// DELETE /api/courses/:id
router.delete('/:id', (req, res) => {
    const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));
    
    if (courseIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Course not found'
        });
    }
    
    const deleted = courses.splice(courseIndex, 1)[0];
    
    res.json({
        success: true,
        message: 'Course deleted',
        data: deleted
    });
});

// Export for testing
router.resetData = () => {
    courses = [
        { id: 1, name: 'React Mastery', duration: '6 weeks', price: 299 },
        { id: 2, name: 'Node.js Fundamentals', duration: '4 weeks', price: 199 },
        { id: 3, name: 'Full Stack Development', duration: '12 weeks', price: 499 }
    ];
    nextId = 4;
};

module.exports = router;
