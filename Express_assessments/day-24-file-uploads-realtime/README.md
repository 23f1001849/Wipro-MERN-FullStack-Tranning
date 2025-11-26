# 📤 Day 24 - File Uploads & Real-Time Communication

File upload functionality with Multer and real-time chat using Socket.io.

## 🎯 Features

- ✅ **File Upload** - Multer for PDF/image uploads
- ✅ **File Validation** - Type and size restrictions
- ✅ **Static File Serving** - Express.static for downloads
- ✅ **Real-Time Chat** - Socket.io bidirectional communication
- ✅ **Typing Indicators** - Live typing status
- ✅ **User Presence** - Online users list

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

## 📡 Endpoints

### File Upload

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/upload` | Upload form page |
| POST | `/upload` | Upload a file |
| GET | `/upload/files` | List uploaded files |
| GET | `/materials/:filename` | Download file |

### Chat

| Endpoint | Description |
|----------|-------------|
| `/` | Chat interface |
| WebSocket | Real-time messaging |

## 📝 Usage Examples

### Upload a File

```bash
curl -X POST http://localhost:4000/upload \
  -F "file=@document.pdf"
```

**Response:**
```json
{
  "success": true,
  "message": "File uploaded successfully: document.pdf",
  "data": {
    "filename": "1699900000000-document.pdf",
    "originalName": "document.pdf",
    "size": 12345,
    "url": "/materials/1699900000000-document.pdf"
  }
}
```

### List Uploaded Files

```bash
curl http://localhost:4000/upload/files
```

### Download a File

```bash
curl http://localhost:4000/materials/filename.pdf --output file.pdf
```

## 📁 File Upload Configuration

### Allowed File Types
- PDF documents (`.pdf`)
- Word documents (`.doc`, `.docx`)
- Images (`.jpg`, `.jpeg`, `.png`, `.gif`)

### Limits
- Maximum file size: 10MB
- Sanitized filenames with timestamps

## 💬 Socket.io Events

### Client → Server

| Event | Data | Description |
|-------|------|-------------|
| `join` | `username` | Join chat room |
| `chat message` | `{ text }` | Send message |
| `typing` | - | User is typing |
| `stop typing` | - | User stopped typing |

### Server → Client

| Event | Data | Description |
|-------|------|-------------|
| `chat message` | `{ username, text, timestamp }` | New message |
| `user joined` | `{ username }` | User joined |
| `user left` | `{ username }` | User left |
| `users list` | `[usernames]` | Online users |
| `typing` | `{ username }` | Someone typing |

## 📁 Project Structure

```
day-24-file-uploads-realtime/
├── server.js              # Main server with Socket.io
├── routes/
│   └── upload.js          # File upload routes
├── public/
│   └── index.html         # Chat interface
├── uploads/               # Uploaded files
├── package.json
└── README.md
```

## 📋 Challenges Covered

1. ✅ File Upload - Multer PDF upload
2. ✅ Static Files - Serve uploaded materials
3. ✅ Real-Time Chat - Socket.io messaging

## 🔧 Technologies Used

- **Express.js** - Web framework
- **Multer** - File upload handling
- **Socket.io** - Real-time communication

## 🔒 Security Features

1. File type validation
2. File size limits
3. Filename sanitization
4. HTML escaping in chat

## 📜 License

ISC
