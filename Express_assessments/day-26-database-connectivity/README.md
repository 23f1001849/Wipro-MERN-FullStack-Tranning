# 🗄️ Day 26 - Database Connectivity

Comprehensive database integration demo with MySQL, MongoDB, and Sequelize ORM.

## 🎯 Features

- ✅ **MySQL Integration** - Direct mysql2 connection
- ✅ **MongoDB Integration** - Mongoose ODM
- ✅ **Sequelize ORM** - Model relationships
- ✅ **In-Memory Fallback** - Works without database
- ✅ **Best Practices** - Environment variables, migrations

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Configuration

```bash
cp .env.example .env
# Edit .env with your database credentials
```

### Running the Server

```bash
npm start
```

Server will start at `http://localhost:4000`

**Note:** The application works without database configuration using in-memory storage.

## 📡 API Endpoints

### MySQL Routes (`/api/mysql`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/mysql` | Service info |
| GET | `/api/mysql/courses` | List courses |
| POST | `/api/mysql/courses` | Insert course |
| GET | `/api/mysql/courses/:id` | Get course |

### MongoDB Routes (`/api/mongodb`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/mongodb` | Service info |
| GET | `/api/mongodb/users` | List users |
| POST | `/api/mongodb/users` | Create user |
| GET | `/api/mongodb/enrollments` | List enrollments |
| POST | `/api/mongodb/enrollments` | Create enrollment |
| GET | `/api/mongodb/users/:id/enrollments` | User enrollments |

### Sequelize Routes (`/api/sequelize`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sequelize` | Service info |
| GET | `/api/sequelize/instructors` | List instructors |
| POST | `/api/sequelize/instructors` | Create instructor |
| GET | `/api/sequelize/courses` | List courses |
| POST | `/api/sequelize/courses` | Create course |
| GET | `/api/sequelize/instructors/:id/courses` | Instructor's courses |

## 📝 Usage Examples

### MySQL - Insert Course

```bash
curl -X POST http://localhost:4000/api/mysql/courses \
  -H "Content-Type: application/json" \
  -d '{"name": "Python Basics", "duration": "4 weeks", "price": 199}'
```

### MongoDB - Create User

```bash
curl -X POST http://localhost:4000/api/mongodb/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Brown", "email": "alice@example.com", "role": "student"}'
```

### Sequelize - Get Instructor's Courses

```bash
curl http://localhost:4000/api/sequelize/instructors/1/courses
```

## 🔗 Database Relationships

### Sequelize ORM

```
Instructor (One) ──────> (Many) Course
    │                        │
    └── id                   └── InstructorId (FK)
    └── name                 └── name
    └── email                └── duration
    └── specialization       └── price
```

## 📁 Project Structure

```
day-26-database-connectivity/
├── server.js              # Main application
├── routes/
│   ├── mysql.js           # MySQL routes
│   ├── mongodb.js         # MongoDB routes
│   └── sequelize.js       # Sequelize routes
├── .env.example           # Environment template
├── package.json
└── README.md
```

## ⚙️ Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 4000 |
| `MYSQL_HOST` | MySQL host | localhost |
| `MYSQL_PORT` | MySQL port | 3306 |
| `MYSQL_USER` | MySQL user | root |
| `MYSQL_PASSWORD` | MySQL password | (empty) |
| `MYSQL_DATABASE` | MySQL database | skillsphere |
| `MONGODB_URI` | MongoDB connection string | - |

## 📋 Challenges Covered

1. ✅ MySQL Integration - mysql2 package
2. ✅ MongoDB Integration - Mongoose ODM
3. ✅ Sequelize ORM - Models with relationships

## 🔧 Technologies Used

- **Express.js** - Web framework
- **mysql2** - MySQL client
- **Mongoose** - MongoDB ODM
- **Sequelize** - SQL ORM
- **dotenv** - Environment variables

## 🔒 Best Practices

1. Store credentials in `.env` files
2. Use migrations for schema changes
3. Create indexes for frequent queries
4. Normalize SQL data, denormalize NoSQL when needed

## 📜 License

ISC
