//this fill will have server code in express js setup , routes and custom middleware and server start etc
//1.import express module
const express = require('express');

//2.create an express application
const app = express();

//3.middleware to parse JSON request bodies with built-in express middleware ie express.json() and express.urlencoded()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//4.custom middleware to log request details
//app.use() is used to mount the middleware function at the application level at the specified path
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
    next();
});

//5.define routes(these will go through the custom middleware defined above first)
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/data', (req, res) => {
    res.json({ receivedData: req.body });
});

//6.start the server and listen on a specified port
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//for handling errors we can add an error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//below flow will be followed when a request is made to the server
//1.client makes a request to the server
//2.request goes through the custom middleware which logs the request details
//3.request reaches the appropriate route handler based on the request method and URL
//4.route handler processes the request and sends back a response to the client
//5.client receives the response from the server
//