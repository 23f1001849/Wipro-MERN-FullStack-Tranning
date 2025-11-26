/**
 * Authentication Middleware
 * Check if user is authenticated and has required role
 */

// Check if user is authenticated
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Please log in to access this resource');
    res.redirect('/login');
};

// Check if user is NOT authenticated (for login/register pages)
const ensureGuest = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/dashboard');
};

// Check if user is admin
const ensureAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    req.flash('error_msg', 'Access Denied: Admin privileges required');
    res.redirect('/dashboard');
};

// Role-based access control middleware
const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.isAuthenticated()) {
            req.flash('error_msg', 'Please log in to access this resource');
            return res.redirect('/login');
        }
        
        if (!roles.includes(req.user.role)) {
            req.flash('error_msg', 'Access Denied: Insufficient privileges');
            return res.redirect('/dashboard');
        }
        
        next();
    };
};

module.exports = {
    ensureAuthenticated,
    ensureGuest,
    ensureAdmin,
    requireRole
};
