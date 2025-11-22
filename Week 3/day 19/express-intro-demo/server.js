const express = require('express');
const app = express();
app.use(express.json());

const info = {
  whatIs: 'Express.js is a minimal web framework on top of Node HTTP module.',
  whyUse: ['Routing abstraction', 'Middleware ecosystem', 'Familiar API'],
  features: ['Declarative routing', 'Middleware pipeline', 'Template engine support'],
};

app.get('/', (req, res) => {
  res.json({ message: 'Day 19 · Express introduction', info });
});

app.get('/getting-started', (req, res) => {
  res.json({
    steps: ['npm init -y', 'npm install express', "create server.js and import express"],
    sample: "const express = require('express'); const app = express(); app.listen(3000);",
  });
});

app.post('/echo', (req, res) => {
  res.json({ note: 'Express json body parsing demo', body: req.body });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

const PORT = process.env.PORT || 3019;
app.listen(PORT, () => console.log(`Day19 Express intro server running on http://localhost:${PORT}`));
