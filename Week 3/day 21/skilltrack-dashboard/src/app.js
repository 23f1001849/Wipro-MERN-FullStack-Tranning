const path = require('path');
const express = require('express');
const morgan = require('morgan');

const students = require('../data/students');
const requestLogger = require('../middleware/requestLogger');
const validateStudent = require('../middleware/validateStudent');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const morganFormat = ':method :url :status :response-time ms';
app.use(morgan(morganFormat));
app.use(requestLogger);

app.get('/', (req, res) => {
  const summary = buildSummary();
  res.render('dashboard', { summary, students });
});

app.get('/students', (req, res) => {
  const summary = buildSummary();
  res.render('students', { summary, students, toastMessage: null });
});

app.post('/students', validateStudent, (req, res) => {
  const { name, email, course = 'Full Stack Accelerator' } = req.body;
  const lastStudent = students[students.length - 1];
  const nextId = lastStudent ? lastStudent.id + 1 : 1;
  const newStudent = {
    id: nextId,
    name,
    email,
    course,
    attendance: 100,
    completion: 0,
    lastActive: new Date().toISOString().slice(0, 10)
  };

  students.push(newStudent);

  const expectsHtml = req.headers.accept?.includes('text/html');
  if (expectsHtml) {
    const summary = buildSummary();
    return res.status(201).render('students', {
      summary,
      students,
      toastMessage: `${name} added successfully.`
    });
  }

  return res.status(201).json({ message: 'Student added', student: newStudent });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('/simulate-error', () => {
  throw new Error('Intentional server failure for monitoring.');
});

app.use((req, res, next) => {
  const notFoundError = new Error('Resource not found.');
  notFoundError.status = 404;
  next(notFoundError);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const userMessage = status === 500
    ? 'The server hit an unexpected issue. Please try again later.'
    : err.message;

  if (status === 500) {
    console.error(err);
  }

  if (req.accepts('html')) {
    return res.status(status).render('error', {
      status,
      message: userMessage
    });
  }

  res.status(status).json({ status, message: userMessage });
});

function buildSummary() {
  const totalStudents = students.length;
  const totalAttendance = students.reduce((sum, student) => sum + student.attendance, 0);
  const totalCompletion = students.reduce((sum, student) => sum + student.completion, 0);

  const averageAttendance = totalStudents ? Math.round(totalAttendance / totalStudents) : 0;
  const averageCompletion = totalStudents ? Math.round(totalCompletion / totalStudents) : 0;
  const highPerformers = students.filter((student) => student.completion >= 85).length;

  return {
    totalStudents,
    averageAttendance,
    averageCompletion,
    highPerformers,
    lastUpdated: new Date().toLocaleString()
  };
}

module.exports = app;
