/**
 * Admin Routes
 * Protected routes for admin users only (Challenge 3: RBAC)
 */

const express = require('express');
const router = express.Router();

const { ensureAdmin, requireRole } = require('../middleware/auth');
const { getUsers } = require('../config/passport');

// GET /admin - Admin Dashboard (requires admin role)
router.get('/', ensureAdmin, async (req, res, next) => {
    try {
        const users = await getUsers();
        res.render('admin', {
            title: 'Admin Dashboard',
            message: 'Welcome, Admin!',
            users
        });
    } catch (error) {
        next(error);
    }
});

// GET /admin/users - View all users
router.get('/users', requireRole('admin'), async (req, res, next) => {
    try {
        const users = (await getUsers()).map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role
        }));
        
        res.json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        next(error);
    }
});

// GET /admin/stats - Admin statistics
router.get('/stats', requireRole('admin'), async (req, res, next) => {
    try {
        const users = await getUsers();
        const stats = {
            totalUsers: users.length,
            admins: users.filter(u => u.role === 'admin').length,
            students: users.filter(u => u.role === 'student').length,
            instructors: users.filter(u => u.role === 'instructor').length
        };
        
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
