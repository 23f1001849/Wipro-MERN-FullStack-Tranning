# 📚 Day 19 - Express.js Fundamentals: BookStore API

A comprehensive Express.js API demonstrating fundamental concepts including routing, middleware, CRUD operations, and error handling.

## 🎯 Features

- ✅ **Basic Express Server** - Server setup on port 4000
- ✅ **Routing & Query Parameters** - Product search with query params
- ✅ **Custom Middleware** - Request logging with timestamps
- ✅ **CRUD Operations** - Complete REST API for books
- ✅ **Modular Routing** - Separated route files
- ✅ **Error Handling** - Global 404 and error middleware
- ✅ **Input Validation** - Using express-validator

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

### Base Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message |
| GET | `/status` | Server status |
| GET | `/products?name=` | Product search |

### Books API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get single book |
| POST | `/books` | Add new book |
| PUT | `/books/:id` | Update book |
| DELETE | `/books/:id` | Delete book |

## 📝 Usage Examples

### Get all books

```bash
curl http://localhost:4000/books
```

### Add a new book

```bash
curl -X POST http://localhost:4000/books \
  -H "Content-Type: application/json" \
  -d '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald"}'
```

### Update a book

```bash
curl -X PUT http://localhost:4000/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "1984 (Updated)", "author": "George Orwell"}'
```

### Delete a book

```bash
curl -X DELETE http://localhost:4000/books/1
```

### Search products

```bash
curl "http://localhost:4000/products?name=Laptop"
```

## 📁 Project Structure

```
day-19-express-fundamentals/
├── server.js           # Main application file
├── routes/
│   └── books.js        # Books route module
├── package.json
└── README.md
```

## 🔧 Technologies Used

- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **express-validator** - Input validation

## 📋 Challenges Covered

1. ✅ Setting Up Express Server
2. ✅ Express Routing & Query Parameters
3. ✅ Express Middleware (Logging)
4. ✅ REST API (CRUD Operations)
5. ✅ Modular Routing & Error Handling

## 📜 License

ISC
