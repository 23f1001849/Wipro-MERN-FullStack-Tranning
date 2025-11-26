# 🎓 Day 20 - Basic Routing & Route Middleware

SkillSphere LMS API with dynamic routing and validation middleware for course management.

## 🎯 Features

- ✅ **Basic Route Setup** - Welcome endpoint
- ✅ **Dynamic Routing** - Course details by ID
- ✅ **Route Middleware** - ID validation before processing
- ✅ **Organized Routes** - Modular route files
- ✅ **JSON Responses** - Consistent API responses

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

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message |
| GET | `/health` | Health check |
| GET | `/courses` | Get all courses |
| GET | `/courses/:id` | Get course by ID |
| GET | `/courses/:id/details` | Get detailed course info |

## 📝 Usage Examples

### Welcome Message

```bash
curl http://localhost:4000/
# Response: "Welcome to SkillSphere LMS API"
```

### Get All Courses

```bash
curl http://localhost:4000/courses
```

### Get Course by ID (Valid)

```bash
curl http://localhost:4000/courses/101
# Response: { "id": "101", "name": "React Mastery", "duration": "6 weeks" }
```

### Get Course by ID (Invalid)

```bash
curl http://localhost:4000/courses/abc
# Response: { "error": "Invalid course ID" }
```

## 🔒 Middleware Validation

The `validateCourseId` middleware:
- Checks if the ID parameter is numeric
- Returns 400 error for invalid IDs
- Attaches parsed ID to request object

## 📁 Project Structure

```
day-20-routing-middleware/
├── server.js           # Main application file
├── routes/
│   └── courses.js      # Course routes with middleware
├── package.json
└── README.md
```

## 📋 Challenges Covered

1. ✅ Basic Route Setup - Welcome message at root
2. ✅ Dynamic Routing - Course details via URL params
3. ✅ Route Middleware - ID validation middleware

## 🔧 Technologies Used

- **Express.js** - Web framework

## 📜 License

ISC
