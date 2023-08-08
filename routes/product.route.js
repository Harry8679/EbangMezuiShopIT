const express = require('express');
const router = express.Router();

const { getProducts, newProduct, getSingleProduct, updateProduct } = require('../controllers/product.controller');

router.route('/products').get(getProducts);
router.route('/products/new').post(newProduct);
router.route('/products/:id').get(getSingleProduct);
router.route('/products/:id').put(updateProduct);

module.exports = router;