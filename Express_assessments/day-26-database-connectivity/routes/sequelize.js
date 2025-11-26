/**
 * Day 26 - Challenge 3: Sequelize ORM
 * Course and Instructor models with relationships
 */

const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const router = express.Router();

// In-memory fallback
let inMemoryInstructors = [
    { id: 1, name: 'John Smith', email: 'john@skillsphere.com', specialization: 'Frontend Development' },
    { id: 2, name: 'Jane Doe', email: 'jane@skillsphere.com', specialization: 'Backend Development' }
];

let inMemoryCourses = [
    { id: 1, name: 'React Mastery', duration: '6 weeks', price: 299, instructorId: 1 },
    { id: 2, name: 'Vue.js Essentials', duration: '4 weeks', price: 199, instructorId: 1 },
    { id: 3, name: 'Node.js Fundamentals', duration: '5 weeks', price: 249, instructorId: 2 },
    { id: 4, name: 'Express API Design', duration: '3 weeks', price: 179, instructorId: 2 }
];

let nextInstructorId = 3;
let nextCourseId = 5;
let usingInMemory = true;

// Sequelize models
let sequelize, Instructor, Course;

// Initialize Sequelize
async function initializeSequelize() {
    try {
        // Check if database config is available
        if (process.env.MYSQL_HOST && process.env.MYSQL_DATABASE) {
            sequelize = new Sequelize(
                process.env.MYSQL_DATABASE,
                process.env.MYSQL_USER || 'root',
                process.env.MYSQL_PASSWORD || '',
                {
                    host: process.env.MYSQL_HOST,
                    dialect: 'mysql',
                    logging: false
                }
            );
            
            await sequelize.authenticate();
            
            // Define Instructor model
            Instructor = sequelize.define('Instructor', {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                specialization: {
                    type: DataTypes.STRING
                }
            });
            
            // Define Course model
            Course = sequelize.define('Course', {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                duration: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                price: {
                    type: DataTypes.DECIMAL(10, 2),
                    defaultValue: 0
                }
            });
            
            // One-to-Many: Instructor -> Courses
            Instructor.hasMany(Course);
            Course.belongsTo(Instructor);
            
            // Sync models
            await sequelize.sync();
            
            usingInMemory = false;
            console.log('Sequelize ORM initialized successfully');
        } else {
            console.log('Sequelize not configured, using in-memory storage');
            console.log('   Configure MySQL settings in .env file');
        }
    } catch (error) {
        console.log('Sequelize initialization failed, using in-memory storage');
        usingInMemory = true;
    }
}

initializeSequelize();

// GET /api/sequelize - Info endpoint
router.get('/', (req, res) => {
    res.json({
        service: 'Sequelize ORM',
        status: usingInMemory ? 'in-memory' : 'connected',
        relationships: {
            'One-to-Many': 'Instructor -> Courses'
        },
        endpoints: {
            instructors: 'GET /api/sequelize/instructors',
            courses: 'GET /api/sequelize/courses',
            instructorCourses: 'GET /api/sequelize/instructors/:id/courses'
        }
    });
});

// GET /api/sequelize/instructors - Get all instructors
router.get('/instructors', async (req, res) => {
    try {
        if (usingInMemory) {
            return res.json({
                success: true,
                storage: 'in-memory',
                count: inMemoryInstructors.length,
                data: inMemoryInstructors
            });
        }
        
        const instructors = await Instructor.findAll({
            include: Course
        });
        
        res.json({
            success: true,
            storage: 'sequelize',
            count: instructors.length,
            data: instructors
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/sequelize/instructors - Create instructor
router.post('/instructors', async (req, res) => {
    const { name, email, specialization } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({
            error: 'Name and email are required'
        });
    }
    
    try {
        if (usingInMemory) {
            const newInstructor = {
                id: nextInstructorId++,
                name,
                email,
                specialization: specialization || 'General'
            };
            inMemoryInstructors.push(newInstructor);
            
            return res.status(201).json({
                success: true,
                storage: 'in-memory',
                data: newInstructor
            });
        }
        
        const instructor = await Instructor.create({ name, email, specialization });
        
        res.status(201).json({
            success: true,
            storage: 'sequelize',
            data: instructor
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/sequelize/courses - Get all courses
router.get('/courses', async (req, res) => {
    try {
        if (usingInMemory) {
            const coursesWithInstructors = inMemoryCourses.map(course => ({
                ...course,
                instructor: inMemoryInstructors.find(i => i.id === course.instructorId)
            }));
            
            return res.json({
                success: true,
                storage: 'in-memory',
                count: coursesWithInstructors.length,
                data: coursesWithInstructors
            });
        }
        
        const courses = await Course.findAll({
            include: Instructor
        });
        
        res.json({
            success: true,
            storage: 'sequelize',
            count: courses.length,
            data: courses
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/sequelize/courses - Create course
router.post('/courses', async (req, res) => {
    const { name, duration, price, instructorId } = req.body;
    
    if (!name || !duration) {
        return res.status(400).json({
            error: 'Name and duration are required'
        });
    }
    
    try {
        if (usingInMemory) {
            const newCourse = {
                id: nextCourseId++,
                name,
                duration,
                price: price || 0,
                instructorId: instructorId || null
            };
            inMemoryCourses.push(newCourse);
            
            return res.status(201).json({
                success: true,
                storage: 'in-memory',
                data: newCourse
            });
        }
        
        const course = await Course.create({
            name,
            duration,
            price,
            InstructorId: instructorId
        });
        
        res.status(201).json({
            success: true,
            storage: 'sequelize',
            data: course
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/sequelize/instructors/:id/courses - Get courses by instructor
router.get('/instructors/:id/courses', async (req, res) => {
    const instructorId = parseInt(req.params.id);
    
    try {
        if (usingInMemory) {
            const instructor = inMemoryInstructors.find(i => i.id === instructorId);
            
            if (!instructor) {
                return res.status(404).json({ error: 'Instructor not found' });
            }
            
            const courses = inMemoryCourses.filter(c => c.instructorId === instructorId);
            
            return res.json({
                success: true,
                storage: 'in-memory',
                instructor: instructor.name,
                count: courses.length,
                data: courses
            });
        }
        
        const instructor = await Instructor.findByPk(instructorId, {
            include: Course
        });
        
        if (!instructor) {
            return res.status(404).json({ error: 'Instructor not found' });
        }
        
        res.json({
            success: true,
            storage: 'sequelize',
            instructor: instructor.name,
            count: instructor.Courses.length,
            data: instructor.Courses
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
