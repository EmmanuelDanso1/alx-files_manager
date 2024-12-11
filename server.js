// server to connect to the routes folder with index.js file in route

const express = require('express');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 5000;

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});