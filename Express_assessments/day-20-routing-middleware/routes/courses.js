/**
 * Day 20 - Courses Routes with Validation Middleware
 * Dynamic routing and route-level middleware
 */

const express = require('express');
const router = express.Router();

// Sample course data
const courses = [
    { id: 101, name: 'React Mastery', duration: '6 weeks', instructor: 'John Smith', level: 'Intermediate' },
    { id: 102, name: 'Node.js Fundamentals', duration: '4 weeks', instructor: 'Jane Doe', level: 'Beginner' },
    { id: 103, name: 'Full Stack Development', duration: '12 weeks', instructor: 'Bob Wilson', level: 'Advanced' },
    { id: 104, name: 'JavaScript Essentials', duration: '3 weeks', instructor: 'Alice Brown', level: 'Beginner' }
];

// Challenge 3: Route Middleware for Validation
const validateCourseId = (req, res, next) => {
    const { id } = req.params;
    
    // Check if ID is numeric
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ 
            error: 'Invalid course ID',
            message: 'Course ID must be a numeric value'
        });
    }
    
    // Convert to number and attach to request
    req.courseId = parseInt(id);
    next();
};

// GET /courses - Get all courses
router.get('/', (req, res) => {
    res.json({
        success: true,
        count: courses.length,
        data: courses
    });
});

// Challenge 2: Dynamic Routing with middleware
router.get('/:id', validateCourseId, (req, res) => {
    const course = courses.find(c => c.id === req.courseId);
    
    if (!course) {
        return res.status(404).json({ 
            error: 'Course not found',
            message: `No course found with ID: ${req.courseId}`
        });
    }
    
    res.json({
        id: course.id.toString(),
        name: course.name,
        duration: course.duration,
        instructor: course.instructor,
        level: course.level
    });
});

// Additional useful routes
router.get('/:id/details', validateCourseId, (req, res) => {
    const course = courses.find(c => c.id === req.courseId);
    
    if (!course) {
        return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json({
        ...course,
        enrollment: Math.floor(Math.random() * 500) + 50,
        rating: (Math.random() * 2 + 3).toFixed(1),
        modules: Math.floor(Math.random() * 10) + 5
    });
});

module.exports = router;
