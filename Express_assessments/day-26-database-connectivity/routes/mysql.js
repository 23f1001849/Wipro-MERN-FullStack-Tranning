/**
 * Day 26 - Challenge 1: MySQL Integration
 * Using mysql2 package for database operations
 */

const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();

// MySQL configuration
const dbConfig = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'skillsphere'
};

// In-memory fallback when MySQL is not available
let inMemoryCourses = [
    { id: 1, name: 'React Mastery', duration: '6 weeks', instructor: 'John Smith', price: 299 },
    { id: 2, name: 'Node.js Fundamentals', duration: '4 weeks', instructor: 'Jane Doe', price: 199 },
    { id: 3, name: 'Full Stack Development', duration: '12 weeks', instructor: 'Bob Wilson', price: 499 }
];
let nextId = 4;
let usingInMemory = true;

// Create connection pool
let pool = null;

async function initializePool() {
    try {
        pool = mysql.createPool(dbConfig);
        await pool.query('SELECT 1');
        usingInMemory = false;
        console.log('MySQL connected successfully');
        
        // Create table if not exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS courses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                duration VARCHAR(50) NOT NULL,
                instructor VARCHAR(100),
                price DECIMAL(10,2) DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
    } catch (error) {
        console.log('MySQL not available, using in-memory storage');
        console.log('   Configure MySQL in .env file to use actual database');
        usingInMemory = true;
    }
}

// Initialize on module load
initializePool();

// GET /api/mysql - Info endpoint
router.get('/', (req, res) => {
    res.json({
        service: 'MySQL Integration',
        status: usingInMemory ? 'in-memory' : 'connected',
        endpoints: {
            courses: 'GET /api/mysql/courses',
            insertCourse: 'POST /api/mysql/courses'
        }
    });
});

// GET /api/mysql/courses - Get all courses
router.get('/courses', async (req, res) => {
    try {
        if (usingInMemory) {
            return res.json({
                success: true,
                storage: 'in-memory',
                count: inMemoryCourses.length,
                data: inMemoryCourses
            });
        }
        
        const [rows] = await pool.query('SELECT * FROM courses');
        res.json({
            success: true,
            storage: 'mysql',
            count: rows.length,
            data: rows
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/mysql/courses - Insert course
router.post('/courses', async (req, res) => {
    const { name, duration, instructor, price } = req.body;
    
    if (!name || !duration) {
        return res.status(400).json({
            success: false,
            error: 'Name and duration are required'
        });
    }
    
    try {
        if (usingInMemory) {
            const newCourse = {
                id: nextId++,
                name,
                duration,
                instructor: instructor || 'TBA',
                price: price || 0
            };
            inMemoryCourses.push(newCourse);
            
            return res.status(201).json({
                success: true,
                storage: 'in-memory',
                message: 'INSERT INTO courses successful',
                data: newCourse
            });
        }
        
        const [result] = await pool.query(
            'INSERT INTO courses (name, duration, instructor, price) VALUES (?, ?, ?, ?)',
            [name, duration, instructor || null, price || 0]
        );
        
        console.log('INSERT INTO courses successful with ID:', result.insertId);
        
        res.status(201).json({
            success: true,
            storage: 'mysql',
            message: 'INSERT INTO courses successful',
            data: {
                id: result.insertId,
                name,
                duration,
                instructor,
                price
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/mysql/courses/:id - Get course by ID
router.get('/courses/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    
    try {
        if (usingInMemory) {
            const course = inMemoryCourses.find(c => c.id === id);
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }
            return res.json({ success: true, data: course });
        }
        
        const [rows] = await pool.query('SELECT * FROM courses WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
