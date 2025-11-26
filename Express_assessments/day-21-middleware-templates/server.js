/**
 * Day 21 - Middleware & Templates
 * SkillSphere LMS with logging middleware and EJS templates
 */

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { requestLogger } = require('./middleware/logger');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 4000;

// Challenge 3: Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Challenge 1: Custom Logging Middleware
app.use(requestLogger);

// Morgan for detailed HTTP logging (Best Practice)
app.use(morgan('dev'));

// Challenge 2: Built-in Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Sample course data
const courses = [
    { id: 1, name: 'React Mastery', duration: '6 weeks', instructor: 'John Smith', level: 'Intermediate', price: 2999 },
    { id: 2, name: 'Node.js Fundamentals', duration: '4 weeks', instructor: 'Jane Doe', level: 'Beginner', price: 1999 },
    { id: 3, name: 'Full Stack Development', duration: '12 weeks', instructor: 'Bob Wilson', level: 'Advanced', price: 4999 },
    { id: 4, name: 'JavaScript Essentials', duration: '3 weeks', instructor: 'Alice Brown', level: 'Beginner', price: 1499 },
    { id: 5, name: 'Python for Data Science', duration: '8 weeks', instructor: 'Charlie Davis', level: 'Intermediate', price: 3999 }
];

// Home route
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'SkillSphere LMS',
        message: 'Welcome to SkillSphere Learning Management System'
    });
});

// Challenge 3: Render courses page with EJS template
app.get('/courses', (req, res) => {
    res.render('courses', { 
        title: 'Available Courses',
        courses: courses
    });
});

// API endpoint for courses (JSON)
app.get('/api/courses', (req, res) => {
    res.json({
        success: true,
        count: courses.length,
        data: courses
    });
});

// Mount users routes
app.use('/users', usersRouter);

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
        console.log(`View courses at http://localhost:${PORT}/courses`);
    });
}

module.exports = app;
