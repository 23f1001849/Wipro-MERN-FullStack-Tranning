// //here app.js will only set up the Express application initilization code

// const express = require('express');
// const userRoutes = require('./routes/userRoutes'); // Importing user routes 
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use('/api/users', userRoutes);
// // Using user routes for /api/users endpoint

// if (require.main === module) {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }

// module.exports = app;
// // Explanation of the code:
// // 1. We import the Express package and the user routes defined in routes/userRoutes.js.
// // 2. We create an Express application instance.
// // 3. We set up middleware to parse JSON request bodies.
// // 4. We use the user routes for the /api/users endpoint.
// // 5. We start the server and listen on the specified port. ie 3000 or from environment variable.

// here app.js  will contain only express app initialization code
const express = require('express');
const app = express();

// simple routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
module.exports = app;