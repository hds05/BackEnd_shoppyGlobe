// Import express, needed to create4 route
const express = require('express')
// Import controller function for the logic of addToCart, updateCart, deleteCart, get all items of the cart
const { addToCart, updateCart, deleteCartItem, cartItems } = require('../controllers/CartController')
// Import middleware for authenthicated user
const protect = require('../middleware/middleware')
// Create a reoute object
const router = express.Router()

// route for get request for all cart items
router.get('/',protect, cartItems)

// route for post request to add item in the cart
router.post('/addToCart', protect, addToCart)

// route for put request to update item's quantity in the cart
router.put('/updateCart/:id', protect, updateCart)

// route for delete request to delete itemfrom the cart
router.delete('/deleteProduct/:id', protect, deleteCartItem)

// export router so that we can use it in server.js
module.exports = router