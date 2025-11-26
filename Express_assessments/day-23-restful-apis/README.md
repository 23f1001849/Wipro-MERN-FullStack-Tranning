# ⚡ Day 23 - RESTful APIs & API Middleware

Complete RESTful API for course management with validation, rate limiting, and error handling.

## 🎯 Features

- ✅ **CRUD API** - Full Create, Read, Update, Delete operations
- ✅ **Input Validation** - Express-validator for data validation
- ✅ **Rate Limiting** - 5 requests per minute protection
- ✅ **API Versioning** - Best practice with /api/v1 prefix
- ✅ **Error Handling** - Centralized error middleware
- ✅ **Query Filtering** - Filter courses by category, price

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Running the Server

```bash
npm start
```

Server will start at `http://localhost:4000`

## 📡 API Endpoints

### Base URL: `http://localhost:4000/api/v1`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/courses` | Get all courses |
| GET | `/courses/:id` | Get single course |
| POST | `/courses` | Create new course |
| PUT | `/courses/:id` | Full update course |
| PATCH | `/courses/:id` | Partial update course |
| DELETE | `/courses/:id` | Delete course |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `category` | Filter by category | `?category=Frontend` |
| `minPrice` | Minimum price filter | `?minPrice=200` |
| `maxPrice` | Maximum price filter | `?maxPrice=400` |

## 📝 Usage Examples

### Get All Courses

```bash
curl http://localhost:4000/api/v1/courses
```

### Get Courses by Category

```bash
curl "http://localhost:4000/api/v1/courses?category=Frontend"
```

### Create a Course

```bash
curl -X POST http://localhost:4000/api/v1/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Vue.js Essentials",
    "duration": "4 weeks",
    "instructor": "Sarah Connor",
    "price": 249,
    "category": "Frontend"
  }'
```

### Update a Course

```bash
curl -X PUT http://localhost:4000/api/v1/courses/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React Mastery Pro",
    "duration": "8 weeks"
  }'
```

### Delete a Course

```bash
curl -X DELETE http://localhost:4000/api/v1/courses/1
```

## ⚠️ Rate Limiting

The API is protected by rate limiting:
- **Limit:** 5 requests per minute
- **Window:** 60 seconds
- **Response when exceeded:**

```json
{
  "error": "Too many requests",
  "message": "You have exceeded the 5 requests per minute limit.",
  "retryAfter": "60 seconds"
}
```

## ✅ Validation Rules

| Field | Rules |
|-------|-------|
| `name` | Required, 3-100 characters |
| `duration` | Required, format: "X weeks/months/hours" |
| `instructor` | Optional, 2-50 characters |
| `price` | Optional, must be numeric |
| `category` | Optional, must be valid category |

### Valid Categories
- Frontend
- Backend
- Full Stack
- Data Science
- Mobile
- DevOps

## 📁 Project Structure

```
day-23-restful-apis/
├── server.js              # Main application
├── routes/
│   └── courses.js         # Course API routes
├── middleware/
│   └── errorHandler.js    # Error handling
├── package.json
└── README.md
```

## 📋 Challenges Covered

1. ✅ CRUD API Setup - Full REST endpoints
2. ✅ Input Validation - express-validator middleware
3. ✅ API Rate Limiting - 5 requests/minute

## 🔧 Technologies Used

- **Express.js** - Web framework
- **CORS** - Cross-origin support
- **express-validator** - Input validation
- **express-rate-limit** - Rate limiting

## 📜 License

ISC
