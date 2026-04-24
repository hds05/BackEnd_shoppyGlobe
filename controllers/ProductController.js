const Product = require("../models/Products")

exports.getProducts = async(req, res) =>{
    try{

        const products = await Product.find()

        // using json is standard for API
        res.json(products)
    } 
    catch(err){
        res.status(500).json({message:`Internal server error: ${err.message}`})
    }
}