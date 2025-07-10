
const express = require('express');
const {createProduct,allProducts} = require('../Controllers/product');
const {authorizeRoles, authenticatedUser} = require('../middleware.js');
const router = express.Router();

router.post('/create/product', authenticatedUser, authorizeRoles('admin'), createProduct);
router.get('/get/products', allProducts);

module.exports = router; 