const express = require('express');

const router = express.Router();
let students = [];
let currentId = 1;

// Create a new student - POST /students
router.post('/', (req, res) => {
  const student = { id: currentId++, ...req.body };
  students.push(student);
  res.status(201).json(student);
});

// Get all students - GET /students
router.get('/', (req, res) => {
  res.json(students);
});

// Get a student by ID - GET /students/:id
router.get('/:id', (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  res.json(student);
});

// Update a student by ID - PUT /students/:id
router.put('/:id', (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  Object.assign(student, req.body);
  res.json(student);
});

// Delete a student by ID - DELETE /students/:id
router.delete('/:id', (req, res) => {
  const index = students.findIndex((s) => s.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }
  students.splice(index, 1);
  res.json({ message: 'Student deleted successfully' });
});

module.exports = router;
