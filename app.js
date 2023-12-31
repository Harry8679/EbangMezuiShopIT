const express = require('express');
const app = express();

app.use(express.json());

// Import all routes
const products = require('./routes/product.route');

app.use('/api/v1', products);

module.exports = app;