// Handles the demo user registration success response.
const registerUser = (req, res) => {
    const payload = req.validatedBody || req.body;

    return res.status(201).json({
        message: 'User registered successfully',
        user: {
            username: payload.username,
            email: payload.email,
        },
    });
};

module.exports = { registerUser };
