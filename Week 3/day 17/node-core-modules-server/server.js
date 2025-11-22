const http = require('http');
const https = require('https');
const fs = require('fs/promises');
const path = require('path');
const EventEmitter = require('events');

const demoEmitter = new EventEmitter();
demoEmitter.setMaxListeners(20);
let eventCount = 0;
demoEmitter.on('ping', () => eventCount++);

function respondJson(res, payload, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

async function handleFs(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const file = url.searchParams.get('file') || 'notes';
  const filePath = path.join(__dirname, 'data', `${file}.txt`);
  try {
    const contents = await fs.readFile(filePath, 'utf8');
    respondJson(res, { file: path.basename(filePath), contents });
  } catch (error) {
    respondJson(res, { error: 'Unable to read file', details: error.message }, 404);
  }
}

function handlePath(res) {
  const demoPath = path.join('logs', '2025', 'core-modules.log');
  respondJson(res, {
    demoPath,
    parsed: path.parse(demoPath),
    resolveExample: path.resolve(__dirname, '..', 'day 17'),
  });
}

function handleEvents(res) {
  demoEmitter.emit('ping');
  respondJson(res, {
    message: 'Custom EventEmitter increment demonstration',
    totalPings: eventCount,
  });
}

function handleHttps(res) {
  https
    .get('https://jsonplaceholder.typicode.com/todos/1', { headers: { 'User-Agent': 'node-training' } }, (response) => {
      let data = '';
      response.on('data', (chunk) => (data += chunk));
      response.on('end', () => {
        try {
          respondJson(res, { fetched: JSON.parse(data), note: 'Example using https core module' });
        } catch (error) {
          respondJson(res, { raw: data, note: 'Received non-JSON response' });
        }
      });
    })
    .on('error', (error) => respondJson(res, { error: error.message }, 500));
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/fs')) return handleFs(req, res);
  if (req.url.startsWith('/path')) return handlePath(res);
  if (req.url.startsWith('/events')) return handleEvents(res);
  if (req.url.startsWith('/https')) return handleHttps(res);
  if (req.url === '/' || req.url === '/help') {
    return respondJson(res, {
      routes: {
        '/fs?file=notes': 'Reads file using fs/promises and path.',
        '/path': 'Shows path utilities.',
        '/events': 'Emits custom events via EventEmitter.',
        '/https': 'Performs outbound HTTPS request.',
      },
    });
  }
  respondJson(res, { error: 'Unknown route' }, 404);
});

const PORT = process.env.PORT || 3017;
server.listen(PORT, () => console.log(`Day17 core modules server listening on http://localhost:${PORT}`));
