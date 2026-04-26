// import Product model
const Product = require('../models/Products');
// import Cart model
const Cart = require('../models/Cart');
// import mongoose (used for ObjectId validation)
const mongoose = require('mongoose')

exports.cartItems = async (req, res) => {
    try {
        // find all cart items of logged-in user and populate product which replaces productId with full product details
        const allProducts = await Cart.find({ user: req.user.id }).populate("product");
        // cehck if cart is empty
        if (allProducts.length === 0) {
            return res.status(404).json({ message: "Your cart is empty..." })
        }
        // Give response with all cart items
        res.status(200).json(allProducts)
    }
    catch (err) {
        // handle server error
        console.log("There is some server issue to fetch produts from cart.");
        res.status(500).json({ message: err.message })
    }
}

// Add to cart
exports.addToCart = async (req, res) => {
    try {
        // get productId & quantity from request body
        const { productId, quantity } = req.body;
        console.log(productId, quantity)

        // check if productId is valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(404).json({ message: "Product not found" });
        }

        // check if item already exists in cart
        let cartItem = await Cart.findOne({ user: req.user.id, product: productId })
        if (cartItem) {
            // if exists → increase quantity
            cartItem.quantity += Number(quantity)
            await cartItem.save()
        } else {
            // else create new cart item
            cartItem = await Cart.create({
                user: req.user.id,
                product: productId,
                quantity,
            });
        }

        // populate product + user details for better response
        const populatedCartItem = await Cart.findById(cartItem._id)
            .populate("product", "name price description")
            .populate("user", "name email");
        //  Give response with the cart item just added with userId, productId and quantity
        res.status(200).json(populatedCartItem);
    } catch (err) {
        console.log('There is internal server error from Add to cart: ', err.message);
        res.status(500).json({ message: 'Internal server Error.' })
    }
};


exports.updateCart = async (req, res) => {
    try {

        const item = await Cart.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        item.quantity = req.body.quantity;
        await item.save();

        res.json(item);
    }
    catch (err) {
        console.log("There is some server Error in updating cart...");
        res.status(500).json({ message: err.message })
    }
};


exports.deleteCartItem = async (req, res) => {
    try {

        const item = await Cart.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        await item.deleteOne();

        res.json({ message: "Item removed" });
    }
    catch (err) {
        console.log('There is some error in deleting the product.');
        res.status(500).json({ message: err.message })

    }
};
