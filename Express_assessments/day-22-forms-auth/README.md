# 🔐 Day 22 - Forms, Database, and Authentication

Complete authentication system with form handling, session management, and role-based access control.

## 🎯 Features

- ✅ **Form Handling** - Registration with validation
- ✅ **Password Hashing** - Secure bcrypt encryption
- ✅ **Session Management** - Express-session with cookies
- ✅ **Passport.js Authentication** - Local strategy
- ✅ **Role-Based Access Control** - Admin/Student/Instructor roles
- ✅ **Protected Routes** - Authentication middleware
- ✅ **Flash Messages** - Success/error notifications
- ✅ **MongoDB Ready** - Mongoose integration (optional)

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Configuration

```bash
cp .env.example .env
# Edit .env with your settings
```

### Running the Server

```bash
npm start
```

Server will start at `http://localhost:4000`

## 👥 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@skillsphere.com | admin123 |
| Student | student@skillsphere.com | admin123 |

## 📡 Routes

### Public Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page |
| GET | `/register` | Registration form |
| POST | `/register` | Handle registration |
| GET | `/login` | Login form |
| POST | `/login` | Handle login |

### Protected Routes

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | `/dashboard` | Any | User dashboard |
| GET | `/admin` | Admin | Admin panel |
| GET | `/admin/users` | Admin | List all users (JSON) |
| GET | `/admin/stats` | Admin | User statistics |
| GET | `/logout` | Any | Logout user |

## 🔒 Security Features

1. **Password Hashing** - Bcrypt with salt rounds
2. **Session Security** - HTTP-only cookies
3. **RBAC Middleware** - Role-based route protection
4. **Input Validation** - Server-side validation
5. **Flash Messages** - Secure user feedback

## 📁 Project Structure

```
day-22-forms-auth/
├── server.js              # Main application
├── config/
│   ├── database.js        # MongoDB connection
│   └── passport.js        # Passport configuration
├── middleware/
│   └── auth.js            # Authentication middleware
├── routes/
│   ├── auth.js            # Auth routes
│   └── admin.js           # Admin routes
├── views/
│   ├── home.ejs           # Home page
│   ├── register.ejs       # Registration form
│   ├── login.ejs          # Login form
│   ├── dashboard.ejs      # User dashboard
│   ├── admin.ejs          # Admin panel
│   └── error.ejs          # Error page
├── .env.example           # Environment template
├── package.json
└── README.md
```

## 📋 Challenges Covered

1. ✅ Form Handling - Registration via POST form
2. ✅ Database Integration - MongoDB/Mongoose ready
3. ✅ Authentication & RBAC - Passport.js with roles

## 🔧 Technologies Used

- **Express.js** - Web framework
- **Passport.js** - Authentication middleware
- **Bcrypt** - Password hashing
- **Express-session** - Session management
- **Connect-flash** - Flash messages
- **EJS** - Template engine
- **Mongoose** - MongoDB ODM (optional)

## 📜 License

ISC
