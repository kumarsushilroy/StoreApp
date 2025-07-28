
const express = require('express');
const { authenticatedUser, authorizeRoles } = require('../middleware');
const { createOrder, getAllOrders, updateOrder, userOrders } = require('../Controllers/order');

const router = express.Router();

router.post('/create/order', authenticatedUser, createOrder);
router.get('/get/allOrders', getAllOrders);
router.get('/get/userOrders', authenticatedUser, userOrders);
router.put('/update/order/:id', authenticatedUser, authorizeRoles('admin'), updateOrder)


module.exports = router;
