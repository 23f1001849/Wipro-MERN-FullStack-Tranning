/**
 * Day 25 - Challenge 1 & 2: Unit and Integration Tests
 * Testing with Mocha, Chai, and SuperTest
 */

const chai = require('chai');
const request = require('supertest');
const app = require('../server');
const coursesRouter = require('../routes/courses');
const usersRouter = require('../routes/users');

const expect = chai.expect;

describe('SkillSphere API Tests', function() {
    
    // Reset data before each test
    beforeEach(function() {
        coursesRouter.resetData();
        usersRouter.resetData();
    });
    
    // ==========================================
    // Health Check Tests
    // ==========================================
    describe('Health Check', function() {
        it('should return status "App is live"', async function() {
            const res = await request(app).get('/status');
            
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('status', 'App is live');
            expect(res.body).to.have.property('timestamp');
        });
    });
    
    // ==========================================
    // Courses API Tests (Challenge 1: Unit Tests)
    // ==========================================
    describe('Courses API', function() {
        
        describe('GET /api/courses', function() {
            it('should return all courses', async function() {
                const res = await request(app).get('/api/courses');
                
                expect(res.status).to.equal(200);
                expect(res.body.success).to.be.true;
                expect(res.body.data).to.be.an('array');
                expect(res.body.data.length).to.equal(3);
            });
        });
        
        describe('GET /api/courses/:id', function() {
            it('should return a single course', async function() {
                const res = await request(app).get('/api/courses/1');
                
                expect(res.status).to.equal(200);
                expect(res.body.success).to.be.true;
                expect(res.body.data).to.have.property('name', 'React Mastery');
            });
            
            it('should return 404 for non-existent course', async function() {
                const res = await request(app).get('/api/courses/999');
                
                expect(res.status).to.equal(404);
                expect(res.body.success).to.be.false;
                expect(res.body.error).to.equal('Course not found');
            });
        });
        
        describe('POST /api/courses', function() {
            it('should create a new course', async function() {
                const newCourse = {
                    name: 'Vue.js Essentials',
                    duration: '5 weeks',
                    price: 249
                };
                
                const res = await request(app)
                    .post('/api/courses')
                    .send(newCourse);
                
                expect(res.status).to.equal(201);
                expect(res.body.success).to.be.true;
                expect(res.body.data).to.have.property('name', 'Vue.js Essentials');
                expect(res.body.data).to.have.property('id');
            });
            
            it('should fail without required fields', async function() {
                const res = await request(app)
                    .post('/api/courses')
                    .send({ name: 'Test' });
                
                expect(res.status).to.equal(400);
                expect(res.body.success).to.be.false;
            });
        });
        
        describe('PUT /api/courses/:id', function() {
            it('should update an existing course', async function() {
                const updatedCourse = {
                    name: 'React Mastery Pro',
                    duration: '8 weeks',
                    price: 399
                };
                
                const res = await request(app)
                    .put('/api/courses/1')
                    .send(updatedCourse);
                
                expect(res.status).to.equal(200);
                expect(res.body.success).to.be.true;
                expect(res.body.data).to.have.property('name', 'React Mastery Pro');
            });
        });
        
        describe('DELETE /api/courses/:id', function() {
            it('should delete a course', async function() {
                const res = await request(app).delete('/api/courses/1');
                
                expect(res.status).to.equal(200);
                expect(res.body.success).to.be.true;
                
                // Verify deletion
                const checkRes = await request(app).get('/api/courses/1');
                expect(checkRes.status).to.equal(404);
            });
        });
    });
    
    // ==========================================
    // Users API Tests (Challenge 2: Integration Tests)
    // ==========================================
    describe('Users API', function() {
        
        describe('GET /api/users', function() {
            it('should return all users', async function() {
                const res = await request(app).get('/api/users');
                
                expect(res.status).to.equal(200);
                expect(res.body.success).to.be.true;
                expect(res.body.data).to.be.an('array');
                expect(res.body.data.length).to.equal(2);
            });
        });
        
        describe('GET /api/users/:id', function() {
            it('should return a single user', async function() {
                const res = await request(app).get('/api/users/1');
                
                expect(res.status).to.equal(200);
                expect(res.body.success).to.be.true;
                expect(res.body.data).to.have.property('email', 'john@example.com');
            });
            
            it('should return 404 for non-existent user', async function() {
                const res = await request(app).get('/api/users/999');
                
                expect(res.status).to.equal(404);
                expect(res.body.error).to.equal('User not found');
            });
        });
        
        describe('POST /api/users', function() {
            it('should create a new user', async function() {
                const newUser = {
                    name: 'Bob Wilson',
                    email: 'bob@example.com',
                    role: 'student'
                };
                
                const res = await request(app)
                    .post('/api/users')
                    .send(newUser);
                
                expect(res.status).to.equal(201);
                expect(res.body.success).to.be.true;
                expect(res.body.data).to.have.property('email', 'bob@example.com');
            });
            
            it('should reject duplicate email', async function() {
                const res = await request(app)
                    .post('/api/users')
                    .send({ name: 'Test', email: 'john@example.com' });
                
                expect(res.status).to.equal(400);
                expect(res.body.error).to.equal('Email already exists');
            });
        });
        
        describe('PUT /api/users/:id', function() {
            it('should update an existing user', async function() {
                const res = await request(app)
                    .put('/api/users/1')
                    .send({
                        name: 'John Updated',
                        email: 'john.updated@example.com',
                        role: 'instructor'
                    });
                
                expect(res.status).to.equal(200);
                expect(res.body.data).to.have.property('name', 'John Updated');
            });
        });
        
        describe('DELETE /api/users/:id', function() {
            it('should delete a user', async function() {
                const res = await request(app).delete('/api/users/1');
                
                expect(res.status).to.equal(200);
                expect(res.body.success).to.be.true;
            });
        });
    });
    
    // ==========================================
    // 404 Tests
    // ==========================================
    describe('404 Handler', function() {
        it('should return 404 for unknown routes', async function() {
            const res = await request(app).get('/unknown/route');
            
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('Route not found');
        });
    });
});
