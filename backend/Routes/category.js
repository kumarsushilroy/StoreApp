
const express = require('express');

 const router = express.Router();
const {createCategory, getCategory} = require('../Controllers/category.js');
const {authenticatedUser} = require('../middleware.js')

 router.post('/create/category', authenticatedUser, createCategory );
 router.get('/get/category', getCategory);


 module.exports = router;