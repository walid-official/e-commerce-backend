"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getAllProducts = exports.getHomeProducts = exports.createProducts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Product_model_1 = require("./Product.model");
// POST /api/products (create one or many products)
const createProducts = async (req, res) => {
    try {
        const products = req.body;
        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ success: false, message: "No products provided" });
        }
        const inserted = await Product_model_1.Product.insertMany(products);
        return res.status(201).json({ success: true, data: inserted });
    }
    catch (err) {
        console.error("Insert Error:", err);
        return res.status(500).json({ success: false, message: "Failed to insert products" });
    }
};
exports.createProducts = createProducts;
// Get all products (public)
const getHomeProducts = async (_req, res) => {
    try {
        const products = await Product_model_1.Product.find().limit(4);
        return res.json({ success: true, data: products });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
};
exports.getHomeProducts = getHomeProducts;
const getAllProducts = async (_req, res) => {
    try {
        const products = await Product_model_1.Product.find();
        return res.json({ success: true, data: products });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
};
exports.getAllProducts = getAllProducts;
// Get a single product by ID (protected)
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }
        const product = await Product_model_1.Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        return res.json({ success: true, data: product });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Failed to fetch product" });
    }
};
exports.getProductById = getProductById;
//# sourceMappingURL=product.controller.js.map