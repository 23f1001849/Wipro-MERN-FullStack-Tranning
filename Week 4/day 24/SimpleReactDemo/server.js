//here we are setting up a simple express server to serve our React application, middlewares, and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(bodyParser.json());
app.use(cors());

//serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

//student routes
app.use('/api/students', studentRoutes);

//start the server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

//get command to fetch all students
//curl http://localhost:5000/api/students
//post command to add a new student
//curl -X POST http://localhost:5000/api/students -H "Content-Type: application/json" -d '{"name":"David","age":24}'