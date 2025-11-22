const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// simple global middleware to illustrate chaining
app.use((req, res, next) => {
  req.context = { requestId: Date.now().toString(36) };
  next();
});

const lessons = [
  { id: 1, title: 'GET basics' },
  { id: 2, title: 'Dynamic routes' },
];

function requireId(req, res, next) {
  const id = Number(req.params.id);
  const lesson = lessons.find((item) => item.id === id);
  if (!lesson) {
    return res.status(404).json({ error: `Lesson ${id} not found` });
  }
  req.lesson = lesson;
  next();
}

app.get('/', (req, res) => {
  res.json({
    message: 'Day 20 · Express routing demo',
    routes: ['/routes', '/api/lessons (GET, POST)', '/api/lessons/:id (PUT, DELETE)', '/dynamic/:topic', '/middleware-demo'],
    requestId: req.context.requestId,
  });
});

app.get('/routes', (req, res) => {
  res.json({
    explanation: 'Express matches routes by method + path. Order matters.',
    methods: ['GET retrieves data', 'POST creates data', 'PUT/PATCH updates', 'DELETE removes resource'],
  });
});

app.get('/dynamic/:topic', (req, res) => {
  res.json({ topic: req.params.topic, tip: 'Dynamic params available via req.params.topic' });
});

app.use('/middleware-demo', (req, res, next) => {
  req.middlewareNote = 'This route group uses local middleware to tag requests.';
  next();
});

app.get('/middleware-demo', (req, res) => {
  res.json({ note: req.middlewareNote, requestId: req.context.requestId });
});

app.get('/api/lessons', (req, res) => {
  res.json({ lessons });
});

app.post('/api/lessons', (req, res) => {
  const newLesson = { id: lessons.length + 1, title: req.body.title || 'Untitled lesson' };
  lessons.push(newLesson);
  res.status(201).json({ created: newLesson });
});

app.put('/api/lessons/:id', requireId, (req, res) => {
  req.lesson.title = req.body.title || req.lesson.title;
  res.json({ updated: req.lesson });
});

app.delete('/api/lessons/:id', requireId, (req, res) => {
  const index = lessons.indexOf(req.lesson);
  lessons.splice(index, 1);
  res.json({ removed: req.lesson });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3020;
app.listen(PORT, () => console.log(`Day20 routing demo running on http://localhost:${PORT}`));
