const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/students');

const PORT = process.env.PORT || 3000;
const app = express();

// Parse incoming JSON payloads
app.use(bodyParser.json());
// Global logging middleware
app.use(logger);

// Students router showcasing modular routing & CRUD
app.use('/students', studentRoutes);

app.get('/', (req, res) => {
  res.send('Express demo server is up. Try /students');
});

// Fallback 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Centralized error handler for better debugging
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
