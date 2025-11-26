# 🎨 Day 21 - Middleware & Templates

SkillSphere LMS with custom middleware, logging, and dynamic EJS templates.

## 🎯 Features

- ✅ **Custom Logging Middleware** - Logs method, URL, and timestamp
- ✅ **Morgan Logger** - Production-ready HTTP logging
- ✅ **Built-in Middleware** - JSON and URL-encoded parsing
- ✅ **EJS Templates** - Dynamic HTML rendering
- ✅ **Beautiful UI** - Modern, responsive design

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

### Web Pages (HTML)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page |
| GET | `/courses` | Courses page (EJS) |

### API Endpoints (JSON)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | Get all courses (JSON) |
| GET | `/users` | List all users |
| POST | `/users` | Create new user |
| GET | `/users/:id` | Get user by ID |

## 📝 Usage Examples

### Create a User

```bash
curl -X POST http://localhost:4000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

**Response:**
```json
{
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

## 📋 Middleware Stack

1. **Custom Request Logger** - Logs every request with timestamp
2. **Morgan** - Detailed HTTP logging for development
3. **express.json()** - Parse JSON request bodies
4. **express.urlencoded()** - Parse URL-encoded bodies
5. **express.static()** - Serve static files

## 📁 Project Structure

```
day-21-middleware-templates/
├── server.js
├── middleware/
│   └── logger.js       # Custom logging middleware
├── routes/
│   └── users.js        # Users API routes
├── views/
│   ├── index.ejs       # Home page template
│   ├── courses.ejs     # Courses page template
│   └── error.ejs       # Error page template
├── package.json
└── README.md
```

## 🎨 Templates

The project uses EJS (Embedded JavaScript) for dynamic HTML rendering:
- **index.ejs** - Hero section with features
- **courses.ejs** - Course cards grid layout
- **error.ejs** - Styled error pages

## 📋 Challenges Covered

1. ✅ Logging Middleware - Custom request logging
2. ✅ Built-in Middleware - JSON/URL-encoded parsing
3. ✅ Dynamic Templates - EJS course listing

## 🔧 Technologies Used

- **Express.js** - Web framework
- **EJS** - Template engine
- **Morgan** - HTTP logger

## 📜 License

ISC
