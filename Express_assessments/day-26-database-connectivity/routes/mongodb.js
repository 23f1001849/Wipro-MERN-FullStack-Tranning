/**
 * Day 26 - Challenge 2: MongoDB Integration
 * Using Mongoose for User and Enrollment models
 */

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// In-memory fallback
let inMemoryUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'instructor' }
];

let inMemoryEnrollments = [
    { id: 1, userId: 1, courseId: 101, courseName: 'React Mastery', enrolledAt: new Date().toISOString(), status: 'active' },
    { id: 2, userId: 1, courseId: 102, courseName: 'Node.js Fundamentals', enrolledAt: new Date().toISOString(), status: 'completed' }
];

let nextUserId = 3;
let nextEnrollmentId = 3;
let usingInMemory = true;

// MongoDB connection
let isConnected = false;

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
    createdAt: { type: Date, default: Date.now }
});

// Enrollment Schema
const enrollmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Number, required: true },
    courseName: { type: String, required: true },
    enrolledAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'completed', 'dropped'], default: 'active' }
});

let User, Enrollment;

// Initialize MongoDB connection
async function initializeMongoDB() {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (mongoUri) {
            const mongoDbName = process.env.MONGODB_DB_NAME;
            const connectOptions = mongoDbName ? { dbName: mongoDbName } : undefined;
            await mongoose.connect(mongoUri, connectOptions);
            isConnected = true;
            usingInMemory = false;
            User = mongoose.model('User', userSchema);
            Enrollment = mongoose.model('Enrollment', enrollmentSchema);
            console.log(`MongoDB connected successfully${mongoDbName ? ` (db: ${mongoDbName})` : ''}`);
        } else {
            console.log('MongoDB not configured, using in-memory storage');
            console.log('   Set MONGODB_URI in .env file to use actual database');
        }
    } catch (error) {
        console.log('MongoDB connection failed, using in-memory storage');
        usingInMemory = true;
    }
}

initializeMongoDB();

// GET /api/mongodb - Info endpoint
router.get('/', (req, res) => {
    res.json({
        service: 'MongoDB Integration',
        status: usingInMemory ? 'in-memory' : 'connected',
        endpoints: {
            users: 'GET /api/mongodb/users',
            createUser: 'POST /api/mongodb/users',
            enrollments: 'GET /api/mongodb/enrollments',
            userEnrollments: 'GET /api/mongodb/users/:id/enrollments'
        }
    });
});

// GET /api/mongodb/users - Get all users
router.get('/users', async (req, res) => {
    try {
        if (usingInMemory) {
            return res.json({
                success: true,
                storage: 'in-memory',
                count: inMemoryUsers.length,
                data: inMemoryUsers
            });
        }
        
        const users = await User.find();
        res.json({
            success: true,
            storage: 'mongodb',
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/mongodb/users - Create user
router.post('/users', async (req, res) => {
    const { name, email, role } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            error: 'Name and email are required'
        });
    }
    
    try {
        if (usingInMemory) {
            if (inMemoryUsers.some(u => u.email === email)) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            
            const newUser = {
                id: nextUserId++,
                name,
                email,
                role: role || 'student'
            };
            inMemoryUsers.push(newUser);
            
            return res.status(201).json({
                success: true,
                storage: 'in-memory',
                message: 'User created successfully',
                data: newUser
            });
        }
        
        const user = new User({ name, email, role });
        await user.save();
        
        console.log('MongoDB: User saved successfully');
        
        res.status(201).json({
            success: true,
            storage: 'mongodb',
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: error.message });
    }
});

// GET /api/mongodb/enrollments - Get all enrollments
router.get('/enrollments', async (req, res) => {
    try {
        if (usingInMemory) {
            return res.json({
                success: true,
                storage: 'in-memory',
                count: inMemoryEnrollments.length,
                data: inMemoryEnrollments
            });
        }
        
        const enrollments = await Enrollment.find().populate('userId');
        res.json({
            success: true,
            storage: 'mongodb',
            count: enrollments.length,
            data: enrollments
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/mongodb/enrollments - Create enrollment
router.post('/enrollments', async (req, res) => {
    const { userId, courseId, courseName } = req.body;
    
    if (!userId || !courseId || !courseName) {
        return res.status(400).json({
            error: 'userId, courseId, and courseName are required'
        });
    }
    
    try {
        if (usingInMemory) {
            const newEnrollment = {
                id: nextEnrollmentId++,
                userId,
                courseId,
                courseName,
                enrolledAt: new Date().toISOString(),
                status: 'active'
            };
            inMemoryEnrollments.push(newEnrollment);
            
            return res.status(201).json({
                success: true,
                storage: 'in-memory',
                message: 'Enrollment created',
                data: newEnrollment
            });
        }
        
        const enrollment = new Enrollment({ userId, courseId, courseName });
        await enrollment.save();
        
        res.status(201).json({
            success: true,
            storage: 'mongodb',
            message: 'Enrollment created',
            data: enrollment
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/mongodb/users/:id/enrollments - Get user enrollments
router.get('/users/:id/enrollments', async (req, res) => {
    const userId = req.params.id;
    
    try {
        if (usingInMemory) {
            const enrollments = inMemoryEnrollments.filter(
                e => e.userId.toString() === userId
            );
            return res.json({
                success: true,
                storage: 'in-memory',
                count: enrollments.length,
                data: enrollments
            });
        }
        
        const enrollments = await Enrollment.find({ userId });
        
        res.json({
            success: true,
            storage: 'mongodb',
            count: enrollments.length,
            data: enrollments
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
