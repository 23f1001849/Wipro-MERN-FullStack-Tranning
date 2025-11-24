// userRoutes.js is reisponsible for defining user-related routes and applying validation middleware
//Step 1: Import necessary modules including Express, the validation middleware, and any controllers.
//Step 2: Create an Express router instance.
//Step 3: Define routes for user operations (e.g., registration) and apply the validation middleware.
//Step 4: Export the router for use in the main application.

const express = require('express');
const { validateUserRegistration } = require('../joi/JoiMiddleware');
const { userValidationRules } = require('../express-validator/uservalidation');
const { handleValidationResult } = require('../express-validator/validationresult');
const { registerUser } = require('../controllers/userController');
const router = express.Router();
router.post('/register', validateUserRegistration, registerUser);
router.post(
	'/signup',
	userValidationRules(),
	handleValidationResult,
	(req, res) => {
		res.status(200).json({ message: 'Signup route placeholder. Implementation coming soon.' });
	}
);
module.exports = router;

// Explanation of the code:
// 1. We import the Express package, the validation middleware, and the user controller.
// 2. We create an Express router instance.
// 3. We define a POST route for user registration that uses the validateUserRegistration middleware to validate incoming data before passing it to the registerUser controller.
// 4. We export the router for use in the main application.
