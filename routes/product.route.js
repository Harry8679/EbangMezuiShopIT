const express = require('express');
const { isAuthenticated } = require('../middlewares/auth.middleware');
const router = express.Router();

const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');

router.route('/products').get(isAuthenticated, getProducts);
router.route('/admin/products').post(newProduct);
router.route('/products/:id').get(getSingleProduct);
router.route('/admin/products/:id').put(updateProduct);
router.route('/admin/products/:id').delete(deleteProduct);

module.exports = router;