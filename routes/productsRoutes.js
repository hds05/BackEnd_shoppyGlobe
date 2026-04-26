// import express to create routes
const express = require("express")
// create route object
const router = express.Router();
// import controller functions for the logic to get all products, get particular product and to add product in collection
const { getProducts, getProductById, addProduct } = require("../controllers/ProductController");
// import middleware to authonticate the user
const protect = require("../middleware/middleware");

// route for GET request to get all products
router.get('/products', getProducts)

// route for GET request to get particular product with its ID
router.get('/products/:id', getProductById)

// route for POST request to add product in the collection
router.post('/addProduct', protect, addProduct)

// export router to be used in server.js
module.exports = router;