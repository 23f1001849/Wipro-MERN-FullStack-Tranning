const http = require('http');
const os = require('os');

const intro = {
  whatIsNode: 'Node.js is a V8-powered runtime that lets you run JavaScript on servers and CLIs.',
  history: 'Created by Ryan Dahl in 2009, Node popularized event-driven, non-blocking servers for JS.',
  features: ['Single-threaded event loop', 'npm ecosystem', 'Cross-platform tooling'],
  advantages: ['Great for IO-bound apps', 'Huge package ecosystem', 'Same language front and back'],
};

const sampleApp = `// run with node server.js\nconst http = require('http');\nhttp.createServer((req, res) => {\n  res.end('Hello Node fundamentals');\n}).listen(3000);`;

function sendJson(res, data) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ timestamp: new Date().toISOString(), ...data }));
}

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/intro') {
    sendJson(res, { intro });
  } else if (req.url === '/install') {
    sendJson(res, {
      steps: ['Download from nodejs.org (LTS)', 'Verify with node -v', 'Use nvm/nvs for version switching'],
      platform: `${os.type()} ${os.release()}`,
    });
  } else if (req.url === '/npm') {
    sendJson(res, {
      npm: 'The Node Package Manager installs dependencies and publishes reusable modules.',
      commands: ['npm init -y', 'npm install express', 'npx nodemon server.js'],
    });
  } else if (req.url === '/sample-app.js') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(sampleApp);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

const PORT = process.env.PORT || 3016;
server.listen(PORT, () => console.log(`Day16 Node basics server running on http://localhost:${PORT}`));
