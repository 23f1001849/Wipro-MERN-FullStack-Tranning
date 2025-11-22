// This file serves as the main entry point for the application where we will configure template rendering and set up routes.
// Below are the steps to achieve this:
//Step 1: Import necessary modules
//Step 2: Set up the Express application
//Step 3: Configure the template engine
//Step 4: Define routes to render templates
//Step 5: Start the server

// Step 1: Import necessary modules
const express = require('express');
const path = require('path');

// Step 2: Set up the Express application
const app = express();
const port = 3007;

// Step 3: Configure the template engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory
app.set('view engine', 'ejs'); // Set EJS as the template engine
app.engine('html', require('ejs').renderFile); // Allow rendering .html files with EJS

// Step 4: Define routes to render templates
app.get('/', (req, res) => {
    res.render('home.ejs', { title: 'Home Page' });
});

// Step 5: Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
