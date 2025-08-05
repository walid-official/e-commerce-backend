"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderByOrderIdController = exports.getAllOrdersController = exports.getUserOrdersController = exports.createOrderController = void 0;
const order_model_1 = require("./order.model");
const createOrderController = async (req, res) => {
    console.log(req.user);
    try {
        if (!req.user?.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const order = new order_model_1.Order({
            userId: req.user.id,
            items: req.body.items,
            location: req.body.location,
            totalAmount: req.body.totalAmount,
            paymentMethod: req.body.paymentMethod || "COD",
        });
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create order" });
    }
};
exports.createOrderController = createOrderController;
const getUserOrdersController = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const orders = await order_model_1.Order.find({ userId: req.user.id });
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};
exports.getUserOrdersController = getUserOrdersController;
const getAllOrdersController = async (req, res) => {
    try {
        // Check if user is admin
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({ error: "Forbidden: Admins only" });
        }
        const orders = await order_model_1.Order.find().populate("items.productId", "name price image");
        res.status(200).json(orders);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch all orders" });
    }
};
exports.getAllOrdersController = getAllOrdersController;
// GET /api/orders/:orderId
const getOrderByOrderIdController = async (req, res) => {
    try {
        const { orderId } = req.params;
        if (!orderId) {
            return res.status(400).json({ error: "Order ID is required" });
        }
        const order = await order_model_1.Order.findById(orderId).populate("items.productId", "name price image");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch order by ID" });
    }
};
exports.getOrderByOrderIdController = getOrderByOrderIdController;
//# sourceMappingURL=order.controller.js.map