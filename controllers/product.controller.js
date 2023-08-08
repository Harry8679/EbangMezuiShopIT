const Product = require('../models/product.model');

// Create a new Product => /api/v1/products/new
const newProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        });
    } catch(error) {
        res.json(error.message);
    }
}

// Get All Products => /api/v1/products
const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.json(error.message)
    }
}

// Get Single Product details => /api/v1/products/:id
const getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Produit non trouvé'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.json(error.message);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Produit non trouvé'
            });
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.json(error.message);
    }
}

module.exports = { getProducts, newProduct, getSingleProduct, updateProduct };