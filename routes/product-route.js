const express = require('express')
const router = express.Router()
const { getProducts, getProduct } = require('../controllers/admin-product-controller')

router.get("/", getProducts)
router.get("/:productId", getProduct)

module.exports = router