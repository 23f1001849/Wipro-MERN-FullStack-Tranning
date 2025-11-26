// // here in app.test.js we will write test cases for our express app
// // Steps to run the tests:
// // 1. Ensure you have Mocha and Supertest installed in your project.
// // 2. Create a test file named app.test.js in the test directory.
// // 3. Write test cases to verify the functionality of the Express app.
// // 4. Run the tests using the command: npx mocha test/app.test.js

// const request = require('supertest');
// const app = require('../app'); // Import the Express app
// const assert = require('assert');

// describe('GET /', () => {
//     it('should return Hello World!', (done) => {
//         request(app)
//             .get('/')
//             .expect(200)
//             .end((err, res) => {
//                 if (err) return done(err);
//                 assert.strictEqual(res.text, 'Hello World!');
//                 done();
//             });
//     });
// });

// // Explanation of the code:
// // 1. We import the necessary modules: supertest for making HTTP requests, the Express app, and assert for assertions.
// // 2. We define a test suite using describe for the GET / endpoint.
// // 3. Inside the suite, we define a test case using it that checks if the response from the GET / request is "Hello World!".
// // 4. We use supertest to make a GET request to the root endpoint and check if the status code is 200.
// // 5. We assert that the response text matches "Hello World!" and call done() to indicate the test is complete. 


// here in app.test we will write tests for our express app via mocha, chai and supertest
//Step 1: import required modules like chai, supertest and our app
//Step 2: write test cases inside describe and it blocks
//Step 3: use supertest to make requests to our app and chai for assertions
//Step 4: run the tests using mocha
//Step 5: verify the output
//Step 6: make sure all tests pass successfully
const chai = require('chai');
const request = require('supertest');
const app = require('../app'); // import the express app
const expect = chai.expect; // chai expect for assertions
// describe block for grouping related tests
describe('GET /', () => {
    it('should return Hello World!', (done) => {
        request(app)    
            .get('/')
            .end((err, res) => {
                expect(res.status).to.equal(200); // assert status code
                expect(res.text).to.equal('Hello World!'); // assert response text
                done();
            }
        );
    });
});

//Further  testing can be done for following : 
// 1. Testing other routes and endpoints
// 2. Testing with different HTTP methods (POST, PUT, DELETE, etc.)
// 3. Testing with various input data and query parameters
// 4. Testing error handling and edge cases
// 5. Integration testing with databases or external services
// 6. Performance testing for response times and load handling

//testing for routes incledes following steps :
//1. Import necessary modules like chai, supertest and the app
//2. Use describe block to group related tests for a specific route
//3. Inside describe block, use it blocks to define individual test cases
//4. Use supertest to make requests to the specific route and chai for assertions
//5. Run the tests using mocha and verify the output
//6. Ensure all tests pass successfully

// Example of testing a POST /api/users route
describe('POST /api/users', () => {
    it('should create a new user and return 201 status', (done) => {
        const newUser = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123'
        };
        request(app)
            .post('/api/users')
            .send(newUser)
            .end((err, res) => {
                expect(res.status).to.equal(201); // assert status code
                expect(res.body).to.have.property('id'); // assert response body has id property
                expect(res.body.username).to.equal(newUser.username); // assert username matches
                done();
            });
    });
});


// Example for testing a specific route /api/users
describe('GET /api/users', () => {
    it('should return a list of users', (done) => {
        request(app)
            .get('/api/users')  
            .end((err, res) => {
                expect(res.status).to.equal(200); // assert status code
                expect(res.body).to.be.an('array'); // assert response body is an array
                done();
            }
        );
    });
});
// In this example, we are testing the /api/users route to ensure it returns a list of users with a 200 status code and that the response body is an array.


// similarly in case of testing middleware or api we can these steps :
// 1. Import necessary modules like chai, supertest and the app
// 2. Use describe block to group related tests for a specific middleware or API
// 3. Inside describe block, use it blocks to define individual test cases
// 4. Use supertest to make requests that trigger the middleware or API and chai for assertions
// 5. Run the tests using mocha and verify the output
// 6. Ensure all tests pass successfully

// Example of testing a middleware that validates user registration data
describe('User Registration Middleware', () => {
    it('should return 400 for invalid registration data', (done) => {
        const invalidUser = {
            username: '',
            email: 'invalidemail',
            password: 'short'
        };
        request(app)
            .post('/api/users') // assuming this route uses the registration middleware
            .send(invalidUser)
            .end((err, res) => {
                expect(res.status).to.equal(400); // assert status code
                expect(res.body).to.have.property('errors'); // assert response body has errors property
                done();
            });
    });
});

// Example for testing a middleware that adds a custom header
describe('Middleware Test', () => {
    it('should add a custom header', (done) => {    
        request(app)
            .get('/some-route') // route that uses the middleware
            .end((err, res) => {
                expect(res.headers).to.have.property('x-custom-header'); // assert custom header exists
                done();
            }
        );
    }   
    );
});
// In this example, we are testing a middleware that adds a custom header (x-custom-header) to the response. 
// We make a request to a route that uses the middleware and assert that the custom header is present in the response headers.

