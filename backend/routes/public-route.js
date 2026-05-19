const express = require("express");
const router = express.Router();

const {
    getProducts,
    getProduct
} = require("../controllers/admin-product-controller");

router.get("/get-products", getProducts);
router.get("/get-product/:productId", getProduct);

module.exports = router;