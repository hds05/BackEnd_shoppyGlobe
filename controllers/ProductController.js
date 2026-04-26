// Import mongoose 
const mongoose = require('mongoose')
// Importing Products model
const Product = require("../models/Products")


// creating product data
exports.addProduct = async (req, res) => {
    try {
        // extract product fields from request body
        const { name, price, description, stock } = req.body
        // create new product document using Product model
        const product = new Product({
            name, description, price, stock
        })
        // save product to database
        await product.save()
        // send created product as response
        res.status(200).json(product)
    }
    catch (err) {
        // handle server error
        console.log("Server Error:", err.message);
        res.status(500).json({ message: err.message })
    }
}

// get all products
exports.getProducts = async (req, res) => {
    try {
        // fetch all products from cart
        const products = await Product.find()
        // if no product in cart
        if (products.length === 0) {
            return res.status(404).json({ message: "There are no products..." })
        }
        // send product reponse as json (standard for API)
        res.status(200).json(products)
    }
    catch (err) {
        // handle server error
        res.status(500).json({ message: err.message })
    }
}

// get product by ID
exports.getProductById = async (req, res) => {
    try {
        // get id from params
        const productId = req.params.id
        // check if productId is valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            console.log('There is no product with this ID...');
            return res.status(404).json({ message: "No product with this ID" })
        }

        // find product by id
        const productById = await Product.findById(productId)
        
        // send that item as response
        res.status(200).json(productById)
    }
    catch (err) {
        // handle Server error
        console.log('Internal server Error', err.message)
        res.status(500).json({ message: err.message })
    }
}