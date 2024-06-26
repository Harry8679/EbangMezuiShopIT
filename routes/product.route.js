const express = require('express');
const { isAuthenticated, protected, authorizeRoles } = require('../middlewares/auth.middleware');
const router = express.Router();

const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');

// router.route('/products').get(isAuthenticated, getProducts);
router.route('/products').get(getProducts);
router.route('/admin/products').post(protected, authorizeRoles('admin'), newProduct);
router.route('/products/:id').get(getSingleProduct);
router.route('/admin/products/:id').put(protected, authorizeRoles('admin'), updateProduct);
router.route('/admin/products/:id').delete(protected, authorizeRoles('admin'), deleteProduct);

module.exports = router;