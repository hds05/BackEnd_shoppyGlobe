
const mongoose = require('mongoose')
// Importing Products model
const Product = require("../models/Products")


// creating product data
exports.addProduct = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body
        const product = new Product({
            name, description, price, stock
        })
        await product.save()
        res.status(200).json(product)
    }
    catch (err) {
        console.log("Server Error:", err.message);
        res.status(500).json({ message: err.message })
    }
}

// get all products
exports.getProducts = async (req, res) => {
    try {

        const products = await Product.find()
        if (products.length === 0) {
            return res.status(404).json({ message: "There are no products..." })
        }
        // using json is standard for API
        res.status(200).json(products)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// get product by ID
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            console.log('There is no product with this ID...');
            return res.status(404).json({ message: "No product with this ID" })
        }
        const productById = await Product.findById(productId)

        res.status(200).json(productById)
    }
    catch (err) {
        console.log('Internal server Error', err.message)
        res.status(500).json({ message: err.message })
    }
}