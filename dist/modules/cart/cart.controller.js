"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.updateCartItemQuantity = exports.removeCartItem = exports.getUserAllCarts = exports.getAllCartsForUsers = exports.getCart = exports.addToCart = void 0;
const Product_model_1 = require("../product/Product.model");
const cart_model_1 = require("./cart.model");
const mongoose_1 = __importDefault(require("mongoose"));
// Add to Cart Controller
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        //  Product check
        const product = await Product_model_1.Product.findById(productId);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        //  Find or create cart
        let cart = await cart_model_1.Cart.findOne({ userId });
        if (!cart) {
            cart = new cart_model_1.Cart({ userId, items: [], total: 0 });
        }
        //  Check if product already exists in cart
        const existingItem = cart.items.find((item) => item.productId.equals(productId));
        if (existingItem) {
            existingItem.quantity += quantity; // Update quantity
            existingItem.subtotal = existingItem.quantity * existingItem.price;
        }
        else {
            cart.items.push({
                productId,
                quantity,
                price: product.price ?? 0,
                image: product.image || "", //  Store product image
                subtotal: (product.price ?? 0) * quantity,
            });
        }
        //  Save cart (subtotal & total handled by pre-save hook)
        await cart.save();
        res.status(200).json({ message: " Product added to cart", cart });
    }
    catch (error) {
        res.status(500).json({ message: " Server error", error });
    }
};
exports.addToCart = addToCart;
// Get User Cart
const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }
        const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
        const cart = await cart_model_1.Cart.findOne({ userId: userObjectId }).populate("items.productId");
        if (!cart) {
            return res.status(200).json({ items: [], total: 0 });
        }
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getCart = getCart;
const getAllCartsForUsers = async (_req, res) => {
    try {
        // All carts with user and product details
        const carts = await cart_model_1.Cart.find({})
            .populate("userId", "name email")
            .populate("items.productId", "name price");
        if (!carts.length) {
            return res.status(200).json({ success: true, carts: [] });
        }
        // Optional: group by userId (if needed)
        const grouped = carts.map((cart) => ({
            user: cart.userId,
            items: cart.items,
            total: cart.total,
            createdAt: cart.createdAt,
        }));
        res.status(200).json({ success: true, carts: grouped });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
exports.getAllCartsForUsers = getAllCartsForUsers;
const getUserAllCarts = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }
        const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
        const carts = await cart_model_1.Cart.find({ userId: userObjectId })
            .populate("items.productId", "name price");
        res.status(200).json({ success: true, carts });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
exports.getUserAllCarts = getUserAllCarts;
// Remove Item from Cart
const removeCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const cart = await cart_model_1.Cart.findOne({ userId });
        if (!cart)
            return res.status(404).json({ message: "Cart not found" });
        cart.items = cart.items.filter((item) => !item.productId.equals(productId));
        await cart.save();
        res.status(200).json({ message: "Item removed", cart });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.removeCartItem = removeCartItem;
const updateCartItemQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        // Quantity validation
        if (quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }
        // Find user cart
        const cart = await cart_model_1.Cart.findOne({ userId });
        if (!cart)
            return res.status(404).json({ message: "Cart not found" });
        // Find item in cart
        const item = cart.items.find((i) => i.productId.equals(productId));
        if (!item)
            return res.status(404).json({ message: "Item not found" });
        // Update quantity
        item.quantity = quantity;
        // Manually calculate total without external function
        let newTotal = 0;
        cart.items.forEach((i) => {
            newTotal += (i.price ?? 0) * i.quantity;
        });
        cart.total = newTotal;
        // Save updated cart
        await cart.save();
        res.status(200).json({ message: " Quantity updated", cart });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.updateCartItemQuantity = updateCartItemQuantity;
// Clear Entire Cart
const clearCart = async (req, res) => {
    try {
        const { userId } = req.body;
        await cart_model_1.Cart.findOneAndUpdate({ userId }, { items: [], total: 0 });
        res.status(200).json({ message: "Cart cleared" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.clearCart = clearCart;
//# sourceMappingURL=cart.controller.js.map