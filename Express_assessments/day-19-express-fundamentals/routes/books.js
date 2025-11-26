/**
 * Day 19 - Challenge 4 & 5: Modular Routes for Books
 * REST API (CRUD Operations) with validation
 */

const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();

// In-memory data store
let books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'The Alchemist', author: 'Paulo Coelho' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

let nextId = 4;

// Validation middleware
const validateBook = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be a string')
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('Title must be between 1 and 200 characters'),
    body('author')
        .notEmpty()
        .withMessage('Author is required')
        .isString()
        .withMessage('Author must be a string')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Author must be between 1 and 100 characters')
];

const validateId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('ID must be a positive integer')
];

// Handles validation errors
const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            error: 'Validation failed',
            details: errors.array() 
        });
    }
    next();
};

// GET /books - Get all books
router.get('/', (req, res) => {
    res.json({
        success: true,
        count: books.length,
        data: books
    });
});

// GET /books/:id - Get single book
router.get('/:id', validateId, handleValidation, (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    
    if (!book) {
        return res.status(404).json({ 
            error: 'Book not found' 
        });
    }
    
    res.json({
        success: true,
        data: book
    });
});

// POST /books - Add new book
router.post('/', validateBook, handleValidation, (req, res) => {
    const { title, author } = req.body;
    
    const newBook = {
        id: nextId++,
        title: title.trim(),
        author: author.trim()
    };
    
    books.push(newBook);
    
    res.status(201).json({
        success: true,
        message: 'Book added successfully',
        data: newBook
    });
});

// PUT /books/:id - Update book
router.put('/:id', [...validateId, ...validateBook], handleValidation, (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({ 
            error: 'Book not found' 
        });
    }
    
    const { title, author } = req.body;
    
    books[bookIndex] = {
        id,
        title: title.trim(),
        author: author.trim()
    };
    
    res.json({
        success: true,
        message: 'Book updated successfully',
        data: books[bookIndex]
    });
});

// DELETE /books/:id - Delete book
router.delete('/:id', validateId, handleValidation, (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({ 
            error: 'Book not found' 
        });
    }
    
    const deletedBook = books.splice(bookIndex, 1)[0];
    
    res.json({
        success: true,
        message: 'Book deleted successfully',
        data: deletedBook
    });
});

module.exports = router;
