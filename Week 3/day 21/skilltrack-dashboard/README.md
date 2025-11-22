# SkillTrack Student Progress Dashboard

Internal Express.js dashboard that showcases custom logging, validation, and error handling middleware for SkillTrack Academy instructors.

## Features mapped to user stories

- **Request logging:** Custom middleware timestamps every incoming method/URL before routes run.
- **Validation guard:** Dedicated middleware verifies `name` and `email` fields for student submissions and blocks invalid payloads with a `400` response.
- **Built-in parsing:** `express.json()` and `express.urlencoded()` enable JSON APIs and HTML form posts.
- **morgan integration:** `morgan` dev format highlights method, status, and response time for each HTTP call.
- **Error handling:** Explicit 404 catcher and four-argument error handler return user-friendly pages or JSON while preventing crashes.
- **Templating:** EJS renders dynamic dashboard pages with cohort stats and recent activity.

## Getting started

```powershell
cd "c:/Users/HARSHALx7/Desktop/REPOS/Wipro-MERN-FullStack-Tranning/Week 3/day 21/skilltrack-dashboard"
npm install
npm test
npm run dev
```

Visit `http://localhost:3000` for the dashboard, `http://localhost:3000/students` for the directory, and `/simulate-error` to exercise the error handler.

## API routes

- `GET /` – Dashboard summary with quick-add form.
- `GET /students` – Cohort directory table.
- `POST /students` – Adds student via JSON or form body (validation middleware enforced).
- `GET /health` – JSON uptime probe for monitoring.
- `GET /simulate-error` – Throws an intentional error to test error handling.

## Testing middleware quickly

1. Submit the add-student form without a name or email to see the validation middleware respond with `400`.
2. Watch the terminal logs to confirm both the custom logger and the `morgan` output for each request.
3. Hit `/simulate-error` to verify the error page plus console stack trace.
