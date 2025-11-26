/**
 * Passport Configuration
 * Local strategy with bcrypt password hashing
 */

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');

// In-memory user storage (fallback when MongoDB is not available)
let users = [
    {
        id: 1,
        name: 'Admin User',
        email: 'admin@skillsphere.com',
        password: '$2b$10$qSCAM1uXdqN0Lv.aE7qLm.RwHtGjWGKfvxI0YEHNwVA7T.9nj8nqy', // password: admin123
        role: 'admin'
    },
    {
        id: 2,
        name: 'John Student',
        email: 'student@skillsphere.com',
        password: '$2b$10$qSCAM1uXdqN0Lv.aE7qLm.RwHtGjWGKfvxI0YEHNwVA7T.9nj8nqy', // password: admin123
        role: 'student'
    }
];

let nextId = 3;

const isMongoConfigured = Boolean(process.env.MONGODB_URI);

const logFallbackNotice = (error) => {
    if (error) {
        console.warn(`MongoDB operation failed (${error.message}). Falling back to in-memory store.`);
    }
};

const useMongoStore = () => isMongoConfigured && mongoose.connection.readyState !== 0;

// Export users array and functions for use in routes
const getUsers = async () => {
    if (useMongoStore()) {
        try {
            return await User.find();
        } catch (error) {
            logFallbackNotice(error);
        }
    }
    return users;
};

const addUser = async (user) => {
    if (useMongoStore()) {
        try {
            const newUser = new User(user);
            return await newUser.save();
        } catch (error) {
            logFallbackNotice(error);
        }
    }
    user.id = nextId++;
    users.push(user);
    return user;
};

const findUserByEmail = async (email) => {
    if (useMongoStore()) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            logFallbackNotice(error);
        }
    }
    return users.find(u => u.email === email);
};

const findUserById = async (id) => {
    if (useMongoStore()) {
        try {
            return await User.findById(id);
        } catch (error) {
            logFallbackNotice(error);
        }
    }
    return users.find(u => u.id === id);
};

module.exports = function(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' },
        async (email, password, done) => {
            try {
                // Find user by email
                const user = await findUserByEmail(email);
                
                if (!user) {
                    return done(null, false, { message: 'Email not registered' });
                }
                
                // Check password
                const isMatch = await bcrypt.compare(password, user.password);
                
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password' });
                }
            } catch (error) {
                return done(error);
            }
        }
    ));
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await findUserById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
};

// Export helper functions
module.exports.getUsers = getUsers;
module.exports.addUser = addUser;
module.exports.findUserByEmail = findUserByEmail;
module.exports.findUserById = findUserById;
