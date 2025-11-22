# Day 23 · RESTful APIs & Middleware

This Express server demonstrates REST architecture, CRUD handlers, validation middleware, error handling, rate limiting, and consuming APIs with `fetch`.

## Setup

```bash
cd "Week 3/day 23/express-restful-demo"
npm install
npm run dev
```

## Key Routes

| Route | Purpose |
| --- | --- |
| `GET /` | Explains REST concepts and lists useful endpoints. |
| `GET /api/courses` | Lists in-memory course resources. |
| `GET /api/courses/:id` | Reads a single resource with param validation. |
| `POST /api/courses` | Creates courses (validates title/category/level). |
| `PUT /api/courses/:id` | Updates partial fields with validation. |
| `DELETE /api/courses/:id` | Deletes a course. |
| `GET /consume` | Uses server-side Fetch API to consume the REST endpoint, simulating AJAX usage. |

### Middleware Highlights

- `express-rate-limit` applied to `/api/*` paths for throttling.
- `express-validator` for input validation and sanitisation.
- Custom 404 handler plus error-handling middleware to format API errors.
