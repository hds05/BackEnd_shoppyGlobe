const Product = require('../models/Products');
const Cart = require('../models/Cart');
const mongoose = require('mongoose')

exports.cartItems = async (req, res) => {
    try {

        const allProducts = await Cart.find({ user: req.user.id }).populate("product");
        if (allProducts.length === 0) {
            return res.status(404).json({ message: "Your cart is empty..." })
        }
        res.status(200).json(allProducts)
    }
    catch (err) {
        console.log("There is some server issue to fetch produts from cart.");
        res.status(500).json({ message: err.message })
    }
}


exports.addToCart = async (req, res) => {
    try {

        const { productId, quantity } = req.body;
        console.log(productId, quantity)
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cartItem = await Cart.findOne({ user: req.user.id, product: productId })
        if (cartItem) {
            cartItem.quantity += Number(quantity)
            await cartItem.save()
        } else {
            cartItem = await Cart.create({
                user: req.user.id,
                product: productId,
                quantity,
            });
        }

        const populatedCartItem = await Cart.findById(cartItem._id)
            .populate("product", "name price description")
            .populate("user", "name email");

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
