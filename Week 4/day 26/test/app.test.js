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
//In above code we have written a simple test case to check if the root route (/) returns "Hello World!" with a 200 status code. We used supertest to make a GET request to the app and chai to assert the response. The tests can be run using the command "npm test" as defined in package.json.