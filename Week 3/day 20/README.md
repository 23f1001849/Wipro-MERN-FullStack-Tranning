# Day 20 Express Demo

Mini Express server that mirrors the classroom walkthrough:

- `index.js` bootstraps Express, parses JSON bodies, applies the global logger, wires the modular `/students` router, and exposes a health check route.
- `middleware/logger.js` prints a timestamped method + URL for every request.
- `routes/students.js` implements in-memory CRUD endpoints for students using Express Router.

## Getting Started

```bash
npm install
npm run dev
```

The server listens on `PORT` (defaults to `3000`). Try hitting the sample endpoints (pick the commands that match your shell):

```bash
# Create (macOS/Linux bash)
echo '{"name":"Harshal","skill":"Node"}' | curl -H "Content-Type: application/json" -d @- http://localhost:3000/students
# Create (Windows PowerShell)
curl.exe -X POST http://localhost:3000/students -H "Content-Type: application/json" -d '{"name":"Harshal","skill":"Node"}'
# Create (PowerShell built-in)
Invoke-RestMethod -Uri http://localhost:3000/students -Method Post -Headers @{"Content-Type" = "application/json"} -Body '{"name":"Harshal","skill":"Node"}'
# List (any shell)
curl http://localhost:3000/students
```

Use `npm start` for a production-style run without Nodemon.
