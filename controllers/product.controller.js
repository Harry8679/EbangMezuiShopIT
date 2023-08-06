const Product = require('../models/product.model');

// Create a new Product => /api/v1/product/new
const newProduct = async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
}

const getProducts = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'This route will show all products in database.'
    });
}

module.exports = { getProducts, newProduct };