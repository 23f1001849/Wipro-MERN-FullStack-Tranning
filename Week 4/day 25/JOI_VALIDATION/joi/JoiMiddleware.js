// Middleware for validating incoming data against Joi schemas.
const { registerSchema } = require('./schema');

const buildErrorMessages = details => details.map(detail => detail.message);

const validateUserRegistration = (req, res, next) => {
    const { value, error } = registerSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (error) {
        return res.status(400).json({ errors: buildErrorMessages(error.details) });
    }

    req.validatedBody = value; // Persist sanitized input for downstream handlers.
    next();
};

module.exports = { validateUserRegistration };