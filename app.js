const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errors.middleware');

app.use(express.json());
app.use(cookieParser());

// Import all routes
const productsRoute = require('./routes/product.route');
const usersRoute = require('./routes/auth.route');

app.use('/api/v1', productsRoute);
app.use('/api/v1/users', usersRoute);

// Middleware
app.use(errorMiddleware);

module.exports = app;