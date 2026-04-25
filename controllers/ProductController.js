


const Product = require("../models/Products")

exports.getProducts = async (req, res) => {
    try {

        const products = await Product.find()

        // using json is standard for API
        res.status(200).json(products)
    }
    catch (err) {
        res.status(500).json({ message: `Internal server error: ${err.message}` })
    }
}

exports.getProductById = async(req, res) => {
    try{
        const productById = await Product.findById(req.params.id)
        if(!productById){
            console.log('There is no product with this ID...');
            res.status(404).json({message: "No product with this ID"})
        }

        res.status(200).json(productById)
    }
    catch(err){
        console.log('Internal server Error', err.message)
        res.status(500).json({message: "There is some server Error"})
    }
}