//create routes for student entity
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

//get all students
router.get('/', studentController.getAllStudents);

//get a student by id
router.get('/:id', studentController.getStudentById);

//add a new student
router.post('/', studentController.addStudent);

//update a student by id
router.put('/:id', studentController.updateStudent);

//delete a student by id
router.delete('/:id', studentController.deleteStudent);

module.exports = router;