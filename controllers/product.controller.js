const Product = require('../models/product.model');

// Create a new Product => /api/v1/product/new
const newProduct = async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
}

const getProducts = async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        count: products.length,
        products
    });
}

module.exports = { getProducts, newProduct };