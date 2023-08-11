const express = require('express');
const app = express();

const errorMiddleware = require('./middlewares/errors.middleware');

app.use(express.json());

// Import all routes
const products = require('./routes/product.route');

app.use('/api/v1', products);

// Middleware
app.use(errorMiddleware);

module.exports = app;