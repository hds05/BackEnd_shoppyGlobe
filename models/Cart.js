// import mongoose, used to create schema & interact with MongoDB
const mongoose = require("mongoose")

// define structure of Cart collection (how each cart document looks)
const cartSchema = new mongoose.Schema({
    // user field (stores reference of the user who owns this cart)
    user: {
        // type will be ObjectId
        type: mongoose.Schema.Types.ObjectId,
        // creates relation with User model
        ref: 'User',
        // required for validation
        required: true
    },
    // product field (stores reference of the product added to cart)
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    // quantity field
    quantity: {
        type: Number,
        default: 1,
        min: 1
    }
})

// export this model to intereact with the collection "Cart" in DB
module.exports = mongoose.model('Cart', cartSchema)