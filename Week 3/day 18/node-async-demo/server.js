const http = require('http');

function simulateCallbackTask(callback) {
  setTimeout(() => callback(null, { message: 'Callback finished after 500ms' }), 500);
}

function simulatePromiseTask(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error('Promise rejected intentionally'));
      else resolve({ message: 'Promise resolved after 700ms' });
    }, 700);
  });
}

async function handleAsyncAwait() {
  const first = await simulatePromiseTask();
  const second = await simulatePromiseTask();
  return { steps: [first.message, second.message], note: 'Await keeps code sequential' };
}

function send(res, payload, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  if (req.url === '/' || req.url === '/topics') {
    return send(res, {
      topics: ['Callbacks', 'Promises', 'Async/Await'],
      routes: ['/callbacks', '/promises', '/async-await'],
    });
  }

  if (req.url === '/callbacks') {
    simulateCallbackTask((error, result) => {
      if (error) return send(res, { error: error.message }, 500);
      send(res, { pattern: 'Error-first callback', result });
    });
    return;
  }

  if (req.url.startsWith('/promises')) {
    const shouldFail = req.url.includes('fail=true');
    simulatePromiseTask(shouldFail)
      .then((result) => send(res, { pattern: 'Promise then/catch', result }))
      .catch((error) => send(res, { error: error.message }, 500));
    return;
  }

  if (req.url === '/async-await') {
    try {
      const result = await handleAsyncAwait();
      return send(res, { pattern: 'Async/Await', result });
    } catch (error) {
      return send(res, { error: error.message }, 500);
    }
  }

  send(res, { error: 'Unknown route' }, 404);
});

const PORT = process.env.PORT || 3018;
server.listen(PORT, () => console.log(`Day18 async demo running on http://localhost:${PORT}`));
