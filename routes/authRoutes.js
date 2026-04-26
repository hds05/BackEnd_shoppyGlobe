// Import express needed to create routes
const express = require('express')
// Import controller functions for logic of register & login
const { registerUser, loginUser } = require('../controllers/AuthController')
// Create a router object
const router = express.Router()

// route for post request for registration
router.post('/register', registerUser)
// route for post request for login
router.post('/login', loginUser)

// Export router so we can use it in server.js
module.exports = router