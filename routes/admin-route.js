const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth-middleware')
const adminMiddleware = require('../middleware/admin-middleware')
const { addProduct, updateProduct, deleteProduct } = require('../controllers/admin-product-controller')

router.post("/", authMiddleware, adminMiddleware, addProduct)
router.put("/", authMiddleware, adminMiddleware, updateProduct)
router.delete("/:productId", authMiddleware, adminMiddleware, deleteProduct)

module.exports = router