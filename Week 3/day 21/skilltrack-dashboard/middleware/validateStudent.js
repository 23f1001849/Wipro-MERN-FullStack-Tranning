module.exports = function validateStudent(req, res, next) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: 'Student submissions require both name and email fields.'
    });
  }

  next();
};
