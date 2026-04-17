const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth-middleware')
const adminMiddleware = require('../middleware/admin-middleware')
const { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus, cancelOrder } = require('../controllers/order-controller')

// customer routes
router.post("/create", authMiddleware, createOrder)
router.get("/my-orders", authMiddleware, getMyOrders)
router.get("/my-orders/:orderId", authMiddleware, getOrderById)
router.put("/cancel/:orderId", authMiddleware, cancelOrder)

// admin only
router.get("/all-orders", authMiddleware, adminMiddleware, getAllOrders)
router.put("/update-status/:orderId", authMiddleware, adminMiddleware, updateOrderStatus)

module.exports = router