const { validationResult } = require('express-validator');

// Express middleware to send the collected validation errors back to the client.
const handleValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

module.exports = { handleValidationResult };
