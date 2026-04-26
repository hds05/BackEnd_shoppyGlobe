const express = require("express")
const router = express.Router();
const { getProducts, getProductById, addProduct } = require("../controllers/ProductController");
const protect = require("../middleware/middleware");


router.get('/products', getProducts)

router.get('/products/:id', getProductById)

router.post('/addProduct', protect, addProduct)
module.exports = router;