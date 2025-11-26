/**
 * Day 23 - Courses API Routes
 * CRUD operations with input validation
 */

const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();

// In-memory course data
let courses = [
    { id: 1, name: 'React Mastery', duration: '6 weeks', instructor: 'John Smith', price: 299, category: 'Frontend' },
    { id: 2, name: 'Node.js Fundamentals', duration: '4 weeks', instructor: 'Jane Doe', price: 199, category: 'Backend' },
    { id: 3, name: 'Full Stack Development', duration: '12 weeks', instructor: 'Bob Wilson', price: 499, category: 'Full Stack' },
    { id: 4, name: 'Python for Data Science', duration: '8 weeks', instructor: 'Alice Brown', price: 399, category: 'Data Science' }
];

let nextId = 5;

// Challenge 2: Input Validation with express-validator
const courseValidation = [
    body('name')
        .notEmpty()
        .withMessage('Course name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Course name must be between 3 and 100 characters')
        .trim(),
    body('duration')
        .notEmpty()
        .withMessage('Duration is required')
        .matches(/^\d+\s*(weeks?|months?|hours?)$/i)
        .withMessage('Duration must be in format: "X weeks", "X months", or "X hours"')
        .trim(),
    body('instructor')
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage('Instructor name must be between 2 and 50 characters')
        .trim(),
    body('price')
        .optional()
        .isNumeric()
        .withMessage('Price must be a number'),
    body('category')
        .optional()
        .isIn(['Frontend', 'Backend', 'Full Stack', 'Data Science', 'Mobile', 'DevOps'])
        .withMessage('Invalid category')
];

const idValidation = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('ID must be a positive integer')
];

// Validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errors.array()[0].msg,
            details: errors.array()
        });
    }
    next();
};

// GET /api/v1/courses - Get all courses
router.get('/', (req, res) => {
    // Support query filtering
    let filteredCourses = [...courses];
    
    const { category, minPrice, maxPrice } = req.query;
    
    if (category) {
        filteredCourses = filteredCourses.filter(c => 
            c.category.toLowerCase() === category.toLowerCase()
        );
    }
    
    if (minPrice) {
        filteredCourses = filteredCourses.filter(c => c.price >= parseInt(minPrice));
    }
    
    if (maxPrice) {
        filteredCourses = filteredCourses.filter(c => c.price <= parseInt(maxPrice));
    }
    
    res.json({
        success: true,
        count: filteredCourses.length,
        data: filteredCourses
    });
});

// GET /api/v1/courses/:id - Get single course
router.get('/:id', idValidation, validate, (req, res) => {
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

// POST /api/v1/courses - Create course
router.post('/', courseValidation, validate, (req, res) => {
    const { name, duration, instructor, price, category } = req.body;
    
    const newCourse = {
        id: nextId++,
        name: name.trim(),
        duration: duration.trim(),
        instructor: instructor?.trim() || 'TBA',
        price: price ? parseInt(price) : 0,
        category: category || 'General'
    };
    
    courses.push(newCourse);
    
    res.status(201).json({
        success: true,
        message: 'Course created successfully',
        data: newCourse
    });
});

// PUT /api/v1/courses/:id - Update course
router.put('/:id', [...idValidation, ...courseValidation], validate, (req, res) => {
    const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));
    
    if (courseIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Course not found'
        });
    }
    
    const { name, duration, instructor, price, category } = req.body;
    
    courses[courseIndex] = {
        ...courses[courseIndex],
        name: name.trim(),
        duration: duration.trim(),
        instructor: instructor?.trim() || courses[courseIndex].instructor,
        price: price ? parseInt(price) : courses[courseIndex].price,
        category: category || courses[courseIndex].category
    };
    
    res.json({
        success: true,
        message: 'Course updated successfully',
        data: courses[courseIndex]
    });
});

// PATCH /api/v1/courses/:id - Partial update
router.patch('/:id', idValidation, validate, (req, res) => {
    const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));
    
    if (courseIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Course not found'
        });
    }
    
    const allowedUpdates = ['name', 'duration', 'instructor', 'price', 'category'];
    const updates = {};
    
    for (const key of allowedUpdates) {
        if (req.body[key] !== undefined) {
            updates[key] = req.body[key];
        }
    }
    
    courses[courseIndex] = { ...courses[courseIndex], ...updates };
    
    res.json({
        success: true,
        message: 'Course updated successfully',
        data: courses[courseIndex]
    });
});

// DELETE /api/v1/courses/:id - Delete course
router.delete('/:id', idValidation, validate, (req, res) => {
    const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));
    
    if (courseIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Course not found'
        });
    }
    
    const deletedCourse = courses.splice(courseIndex, 1)[0];
    
    res.json({
        success: true,
        message: 'Course deleted successfully',
        data: deletedCourse
    });
});

module.exports = router;
