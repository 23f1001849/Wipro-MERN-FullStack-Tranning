// // in server.js run server seperately as app.js will only contain express app initialization code
// // here we will set up a basic Express server
// const app = require('./app');
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// in server.js run server seprately as app.js is only for app initialization
const app = require('./app');
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});