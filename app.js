const express = require('express');
const app = express();

const errorMiddleware = require('./middlewares/errors.middleware');

app.use(express.json());

// Import all routes
const productsRoute = require('./routes/product.route');
const usersRoute = require('./routes/auth.route');

app.use('/api/v1', productsRoute);
app.use('/api/v1/users', usersRoute);

// Middleware
app.use(errorMiddleware);

module.exports = app;