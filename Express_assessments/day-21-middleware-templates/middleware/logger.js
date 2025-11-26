/**
 * Day 21 - Challenge 1: Custom Logging Middleware
 * Logs HTTP method, URL, and timestamp for each request
 */

const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    
    // Log the request
    console.log(`[${method}] ${url} at ${timestamp}`);
    
    // Track response time
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`  └─ Completed in ${duration}ms with status ${res.statusCode}`);
    });
    
    next();
};

module.exports = { requestLogger };
