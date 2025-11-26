# 🧪 Day 25 - Testing & Deployment

Production-ready Express API with comprehensive testing using Mocha, Chai, and SuperTest.

## 🎯 Features

- ✅ **Unit Testing** - Route-level tests with Mocha & Chai
- ✅ **Integration Testing** - Full API tests with SuperTest
- ✅ **Production Ready** - Environment-based configuration
- ✅ **Deployment Ready** - Procfile for Heroku/Render
- ✅ **Health Check** - `/status` endpoint for monitoring

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Running the Server

```bash
npm start
```

### Running Tests

```bash
npm test
```

Server will start at `http://localhost:4000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/status` | Health check |
| GET | `/api/courses` | List courses |
| GET | `/api/courses/:id` | Get course |
| POST | `/api/courses` | Create course |
| PUT | `/api/courses/:id` | Update course |
| DELETE | `/api/courses/:id` | Delete course |
| GET | `/api/users` | List users |
| GET | `/api/users/:id` | Get user |
| POST | `/api/users` | Create user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

## 🧪 Testing

### Test Structure

```
test/
└── api.test.js     # All API tests
```

### Running Tests

```bash
# Run all tests
npm test

# Run with verbose output
npm run test:verbose
```

### Test Coverage

- Health check endpoint
- Courses CRUD operations
- Users CRUD operations
- Error handling (404, validation)
- Edge cases

## 🚀 Deployment

### Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create skillsphere-api

# Deploy
git push heroku main

# Open in browser
heroku open
```

### Render

1. Connect GitHub repository
2. Create new Web Service
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Deploy

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 4000 |
| `NODE_ENV` | Environment | development |

## 📁 Project Structure

```
day-25-testing-deployment/
├── server.js           # Main application
├── routes/
│   ├── courses.js      # Courses API
│   └── users.js        # Users API
├── test/
│   └── api.test.js     # API tests
├── Procfile            # Heroku config
├── package.json
└── README.md
```

## 📋 Challenges Covered

1. ✅ Unit Testing - Mocha & Chai tests
2. ✅ Integration Testing - SuperTest HTTP tests
3. ✅ Deployment - Procfile & environment config

## 🔧 Technologies Used

- **Express.js** - Web framework
- **Mocha** - Test framework
- **Chai** - Assertion library
- **SuperTest** - HTTP testing

## 📊 Test Output Example

```
SkillSphere API Tests
  Health Check
    ✓ should return status "App is live"
  Courses API
    GET /api/courses
      ✓ should return all courses
    GET /api/courses/:id
      ✓ should return a single course
      ✓ should return 404 for non-existent course
    POST /api/courses
      ✓ should create a new course
      ✓ should fail without required fields
    ...

  18 passing (150ms)
```

## 📜 License

ISC
