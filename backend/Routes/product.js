
const express = require('express');
const {createProduct,allProducts, singleProduct} = require('../Controllers/product');
const {authorizeRoles, authenticatedUser} = require('../middleware.js');
const router = express.Router();
const upload = require('../Controllers/auth.js');

router.post('/create/product', upload.single('photo'), authenticatedUser, authorizeRoles('admin'), createProduct);
router.get('/get/products', allProducts);
router.get('/productDetails/:id', singleProduct);

module.exports = router; 