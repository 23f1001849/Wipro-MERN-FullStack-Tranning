/**
 * Day 24 - Challenge 1: File Upload Routes
 * Multer configuration for PDF uploads
 */

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Sanitize filename and add timestamp
        const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniqueName = `${Date.now()}-${sanitizedName}`;
        cb(null, uniqueName);
    }
});

// File filter - only allow certain file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
        'image/gif'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, DOC, DOCX, and images are allowed.'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Upload form page
router.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Upload Course Materials</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Segoe UI', sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }
                .container {
                    background: white;
                    padding: 2rem;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    max-width: 500px;
                    width: 100%;
                }
                h1 { color: #333; margin-bottom: 1rem; }
                p { color: #666; margin-bottom: 1.5rem; }
                .upload-area {
                    border: 2px dashed #667eea;
                    padding: 2rem;
                    text-align: center;
                    border-radius: 10px;
                    margin-bottom: 1rem;
                    background: #f8f9ff;
                }
                input[type="file"] { margin-bottom: 1rem; }
                button {
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    padding: 0.75rem 2rem;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 1rem;
                }
                button:hover { opacity: 0.9; }
                .links { margin-top: 1rem; text-align: center; }
                .links a { color: #667eea; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Upload Course Materials</h1>
                <p>Upload PDF, DOC, or image files (max 10MB)</p>
                <form action="/upload" method="POST" enctype="multipart/form-data">
                    <div class="upload-area">
                        <input type="file" name="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif" required>
                    </div>
                    <button type="submit">Upload File</button>
                </form>
                <div class="links">
                    <a href="/">← Back to Chat</a>
                </div>
            </div>
        </body>
        </html>
    `);
});

// POST /upload - Handle file upload
router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            error: 'No file uploaded'
        });
    }
    
    const fileUrl = `/materials/${req.file.filename}`;
    
    res.json({
        success: true,
        message: `File uploaded successfully: ${req.file.originalname}`,
        data: {
            filename: req.file.filename,
            originalName: req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype,
            url: fileUrl
        }
    });
});

// GET /upload/files - List all uploaded files
router.get('/files', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: 'Unable to list files'
            });
        }
        
        const fileList = files.map(file => ({
            name: file,
            url: `/materials/${file}`
        }));
        
        res.json({
            success: true,
            count: files.length,
            data: fileList
        });
    });
});

// Error handling for multer
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                error: 'File too large. Maximum size is 10MB.'
            });
        }
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }
    
    if (err.message) {
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }
    
    next(err);
});

module.exports = router;
