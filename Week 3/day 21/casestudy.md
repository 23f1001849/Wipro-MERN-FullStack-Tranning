Case Study : 
A training company named SkillTrack Academy wants to develop an internal Student Progress Dashboard using Express.js.
 The system must allow instructors to view students, check progress, and monitor logs, errors, and request behavior.
 The application must use custom middleware, built-in middleware, error-handling middleware, and template engines to render dynamic pages.
The team has provided the following user stories that must be implemented.
User Story 1: Request Logging Middleware
As a system administrator,
 I want the application to log every incoming request with timestamp, method, and URL,
 so that I can monitor system usage and detect suspicious activity.
Acceptance Criteria
A custom middleware must capture request details.
Logs must print in console before any route executes.
Middleware must use next() to allow request to continue.
User Story 2: Validation Middleware for Student Routes
As a backend validator,
 I want a custom middleware to validate incoming student data,
 so that invalid form submissions do not reach the business logic.
Acceptance Criteria
Middleware checks if name and email fields exist in the request body.
If missing, middleware must stop execution and return a proper error response.
If valid, request flows to the route handler.
User Story 3: Using Built-in Middleware for Body Parsing
As a developer,
 I want to use built-in Express middleware (express.json, express.urlencoded)
 so that I can correctly process JSON and form submissions.
Acceptance Criteria
Application must support POST requests from forms.
Body data should be accessible using req.body.
User Story 4: Logging Middleware Using morgan
As a system monitoring engineer,
 I want to integrate the morgan middleware
 so that I can see clean, formatted logs for each HTTP request.
Acceptance Criteria
Use morgan in development mode.
Log format must include status code and response time.
User Story 5: Error Handling Middleware
As a quality engineer,
 I want the system to capture unexpected errors using error-handling middleware,
 so that the application does not crash and returns meaningful error responses.
Acceptance Criteria
Error-handling middleware must use four parameters.
Any thrown error must be caught and handled gracefully.
User-friendly message must be sent for unexpected server errors.