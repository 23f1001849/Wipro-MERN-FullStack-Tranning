const { body } = require('express-validator');

// Validation rules for the demo signup endpoint using express-validator.
const userValidationRules = () => [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').trim().isEmail().withMessage('A valid email is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

module.exports = { userValidationRules };
