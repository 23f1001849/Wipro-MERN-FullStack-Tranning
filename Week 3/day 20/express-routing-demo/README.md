# Day 20 · Express Routing & Middleware Basics

Demonstrates HTTP method routing, dynamic params, and simple middleware chains.

## Run

```bash
npm install
npm run dev
```

## Highlights

- `GET /routes` – Intro to HTTP verbs.
- `GET /dynamic/:topic` – Shows how to read params.
- `GET /middleware-demo` – Route-level middleware tagging requests.
- `/api/lessons` + `/api/lessons/:id` – CRUD-style endpoints using method-specific handlers and `requireId` middleware.
