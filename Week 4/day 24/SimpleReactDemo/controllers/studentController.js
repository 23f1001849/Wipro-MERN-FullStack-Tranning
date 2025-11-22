//controller is responsible for handling requests and responses(business logic)
//here we can define tamparary data to simulate a database

const students = [
    { id: 1, name: 'Alice', age: 20 },
    { id: 2, name: 'Bob', age: 22 },
    { id: 3, name: 'Charlie', age: 23 }
];

//function to get all students
exports.getAllStudents = (req, res) => {
    res.json(students);
};

//function to get a student by id
exports.getStudentById = (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
};

//function to add a new student
exports.addStudent = (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
};

//function to update a student  by id
exports.updateStudent = (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    if (student) {
        student.name = req.body.name || student.name;
        student.age = req.body.age || student.age;
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
};

//function to delete a student by id
exports.deleteStudent = (req, res) => {
    const studentId = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === studentId);
    if (index !== -1) {
        const deletedStudent = students.splice(index, 1);
        res.json(deletedStudent[0]);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
};

