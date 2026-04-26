// import mongoose (to create schema & interact with MongoDB)
const mongoose = require("mongoose")

// define structure of Product collection (each product document will follow this)
const productSchema = new mongoose.Schema({
    // product name
    name: {
        type: String,
        required: true
    },
    // product price
    price: {
        type: Number,
        required: true
    },
    // product's description
    description: {
        type: String,
        required: true
    },
    // product's stock
    stock: {
        type: Number,
        required: true
    }
})

// create model (connects schema with "products" collection in DB)
const Product = mongoose.model("Product", productSchema)
// export model (so it can be used in controllers)
module.exports = Product