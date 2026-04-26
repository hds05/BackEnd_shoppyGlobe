const express = require('express')
const { addToCart, updateCart, deleteCartItem, cartItems } = require('../controllers/CartController')
const protect = require('../middleware/middleware')
const router = express.Router()

router.get('/',protect, cartItems)
router.post('/addToCart', protect, addToCart)
router.put('/updateCart/:id', protect, updateCart)
router.delete('/deleteProduct/:id', protect, deleteCartItem)

module.exports = router