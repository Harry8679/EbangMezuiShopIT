const Product = require('../models/product.model');
const APIFilters = require('../utils/apiFilter.util');
const ErrorHandler = require('../utils/errorHandler.util');
const asyncHanlder = require('express-async-handler');

// Create a new Product => /api/v1/admin/products
const newProduct = asyncHanlder(async (req, res, next) => {
    try {
        req.body.user = req.user._id;
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        });
    } catch(error) {
        res.json(error.message);
    }
});

// Get All Products => /api/v1/products
const getProducts = asyncHanlder(async (req, res, next) => {
    try {
        const resPerPage = 4;
        const apiFilters = new APIFilters(Product, req.query).search().filters();

        let products = await apiFilters.query;
        let filteredProductsCount = products.length;

        apiFilters.pagination(resPerPage);
        products = await apiFilters.query.clone();
        // const products = await Product.find();
        res.status(200).json({
            success: true,
            resPerPage,
            filteredProductsCount,
            products
        });
    } catch (error) {
        res.json(error.message)
    }
});

// Get Single Product details => /api/v1/products/:id
const getSingleProduct = asyncHanlder(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler('Produit non trouvé', 404));
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.json(error.message);
    }
});

// Update a Product => /api/v1/products/:id
const updateProduct = asyncHanlder(async (req, res, next) => {
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
});

// Delete a Product => /api/v1/products/:id
const deleteProduct = asyncHanlder(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler('Product not found', 404));
            // return res.status(404).json({
            //     success: false,
            //     message: 'Produit non trouvé'
            // });
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Produit supprimé avec succès !'
        });
    } catch (error) {
        res.json(error.message);
    }
});

module.exports = { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct };