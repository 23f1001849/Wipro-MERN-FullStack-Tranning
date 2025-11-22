module.exports = function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  const { method, originalUrl } = req;
  console.log(`[${timestamp}] ${method} ${originalUrl}`);
  next();
};
