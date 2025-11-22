const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { body, param, validationResult } = require('express-validator');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: 'Too many requests, slow down.' },
});
app.use('/api', limiter);

let courses = [
  { id: 1, title: 'REST fundamentals', category: 'api', level: 'beginner' },
  { id: 2, title: 'Express middleware', category: 'node', level: 'intermediate' },
];

const createValidators = [
  body('title').trim().isLength({ min: 3 }).withMessage('title must be at least 3 characters'),
  body('category').isIn(['api', 'node', 'frontend']).withMessage('category must be api|node|frontend'),
  body('level').isIn(['beginner', 'intermediate', 'advanced']).withMessage('level must be beginner/intermediate/advanced'),
];

const updateValidators = [
  param('id').isInt().withMessage('id must be numeric'),
  body('title').optional().trim().isLength({ min: 3 }).withMessage('title must be at least 3 characters'),
  body('category').optional().isIn(['api', 'node', 'frontend']).withMessage('invalid category'),
  body('level').optional().isIn(['beginner', 'intermediate', 'advanced']).withMessage('invalid level'),
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}

app.get('/', (req, res) => {
  res.json({
    topic: 'Day 23 · RESTful APIs with Express',
    whatIsRest: 'REST is an architectural style centered around resources, representations, and stateless communication.',
    principles: ['Uniform interface', 'Stateless interactions', 'Cacheable responses', 'Layered system'],
    routes: ['/api/courses', '/api/courses/:id', '/consume'],
  });
});

app.get('/api/courses', (req, res) => {
  res.json({ count: courses.length, data: courses });
});

app.get('/api/courses/:id', [param('id').isInt().withMessage('id must be numeric'), handleValidationErrors], (req, res) => {
  const id = Number(req.params.id);
  const course = courses.find((item) => item.id === id);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json({ data: course });
});

app.post('/api/courses', createValidators, handleValidationErrors, (req, res) => {
  const newCourse = { id: Date.now(), ...req.body };
  courses.push(newCourse);
  res.status(201).json({ message: 'Course created', data: newCourse });
});

app.put('/api/courses/:id', updateValidators, handleValidationErrors, (req, res) => {
  const id = Number(req.params.id);
  const course = courses.find((item) => item.id === id);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  Object.assign(course, req.body);
  res.json({ message: 'Course updated', data: course });
});

app.delete('/api/courses/:id', [param('id').isInt().withMessage('id must be numeric'), handleValidationErrors], (req, res) => {
  const id = Number(req.params.id);
  const exists = courses.some((item) => item.id === id);
  if (!exists) return res.status(404).json({ error: 'Course not found' });
  courses = courses.filter((item) => item.id !== id);
  res.json({ message: 'Course deleted' });
});

app.get('/consume', async (req, res, next) => {
  try {
    const target = `${req.protocol}://${req.get('host')}/api/courses`;
    const response = await fetch(target);
    const data = await response.json();
    res.json({ note: 'Fetched using Fetch API inside Node to simulate AJAX consumer', target, data });
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((error, req, res, next) => {
  console.error('API error', error);
  res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3023;
app.listen(PORT, () => console.log(`Day23 RESTful API demo running on http://localhost:${PORT}`));
