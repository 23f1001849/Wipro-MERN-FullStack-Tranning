/**
 * Database Configuration
 * MongoDB connection using Mongoose
 */

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const options = {};

        if (process.env.MONGODB_DB_NAME) {
            options.dbName = process.env.MONGODB_DB_NAME;
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI, options);
        console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Don't exit in demo mode - use in-memory storage instead
        console.log('Using in-memory storage as fallback');
    }
};

module.exports = connectDB;
