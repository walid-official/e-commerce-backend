import { Request, Response } from "express";
import mongoose from "mongoose";
import { Product } from "./Product.model";

// POST /api/products (create one or many products)
export const createProducts = async (req: Request, res: Response) => {
  try {
    const products = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, message: "No products provided" });
    }

    const inserted = await Product.insertMany(products);
    return res.status(201).json({ success: true, data: inserted });
  } catch (err) {
    console.error("Insert Error:", err);
    return res.status(500).json({ success: false, message: "Failed to insert products" });
  }
};



// Get all products (public)
export const getHomeProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().limit(4);
    return res.json({ success: true, data: products });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
};
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    return res.json({ success: true, data: products });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
};

// Get a single product by ID (protected)
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.json({ success: true, data: product });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to fetch product" });
  }
};
