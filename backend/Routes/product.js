
const express = require('express');
const {createProduct,allProducts, singleProduct} = require('../Controllers/product');
const {authorizeRoles, authenticatedUser} = require('../middleware.js');
const router = express.Router();

router.post('/create/product', authenticatedUser, authorizeRoles('admin'), createProduct);
router.get('/get/products', allProducts);
router.get('/productDetails/:id', singleProduct);

module.exports = router; 