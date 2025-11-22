const request = require('supertest');
const app = require('../src/app');

(async () => {
  try {
    await request(app)
      .get('/health')
      .expect('Content-Type', /json/)
      .expect(200);

    console.log('Smoke test passed: /health endpoint responded with 200.');
  } catch (error) {
    console.error('Smoke test failed:', error.message);
    process.exitCode = 1;
  }
})();
