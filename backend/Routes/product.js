
const express = require('express');
const {createProduct,allProducts, singleProduct, updateProduct, deleteproduct} = require('../Controllers/product');
const {authorizeRoles, authenticatedUser} = require('../middleware.js');
const router = express.Router();
const {upload} = require('../Controllers/auth.js');

router.post('/create/product', upload.single('photo'), authenticatedUser, authorizeRoles('admin'), createProduct);
router.get('/get/products', allProducts);
router.get('/productDetails/:id', singleProduct);
router.put('/update-product/:id', upload.single("photo"), authenticatedUser, updateProduct);
router.delete('/delete-product/:id', authenticatedUser, deleteproduct);
module.exports = router; 