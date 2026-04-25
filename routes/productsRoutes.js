const express = require ("express")
const router = express.Router();
const { getProducts, getProductById } = require("../controllers/ProductController");


router.get('/products', getProducts)

router.get('/product/:id', getProductById)

module.exports = router;