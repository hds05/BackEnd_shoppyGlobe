// import mongoose to create schema and intract with DB
const mongoose = require('mongoose')

// structure of each document in user collection
const userSchema = new mongoose.Schema({
    // User name field and required
    name: {
        type: String,
        required: true
    },
    // User email field should be unique and required
    email: {
        type: String,
        unique: true,
        required: true,
    },
    // User password field and required
    password: {
        type: String,
        required: true
    }
})

// create schema and connects it with user collection
const User = mongoose.model('User', userSchema)
// export model so that it can be used in controller
module.exports = User