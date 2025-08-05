import { Request, Response } from "express";
import { Product } from "../product/Product.model";
import { Cart } from "./cart.model";
import mongoose from "mongoose";


// Add to Cart Controller
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;

    //  Product check
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    //  Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
    }

    //  Check if product already exists in cart
    const existingItem = cart.items.find((item) => item.productId.equals(productId));

    if (existingItem) {
      existingItem.quantity += quantity; // Update quantity
      existingItem.subtotal = existingItem.quantity * existingItem.price;
    } else {
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
  } catch (error) {
    res.status(500).json({ message: " Server error", error });
  }
};

// Get User Cart
export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const cart = await Cart.findOne({ userId: userObjectId }).populate("items.productId");

    if (!cart) {
      return res.status(200).json({ items: [], total: 0 });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllCartsForUsers = async (_req: Request, res: Response) => {
  try {
    // All carts with user and product details
    const carts = await Cart.find({})
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
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const getUserAllCarts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const carts = await Cart.find({ userId: userObjectId })
      .populate("items.productId", "name price");

    res.status(200).json({ success: true, carts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Remove Item from Cart
export const removeCartItem = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item: any) => !item.productId.equals(productId));
    await cart.save();

    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateCartItemQuantity = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Quantity validation
    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // Find user cart
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Find item in cart
    const item = cart.items.find((i: any) => i.productId.equals(productId));
    if (!item) return res.status(404).json({ message: "Item not found" });

    // Update quantity
    item.quantity = quantity;

    // Manually calculate total without external function
    let newTotal = 0;
    cart.items.forEach((i: any) => {
      newTotal += (i.price ?? 0) * i.quantity;
    });
    cart.total = newTotal;

    // Save updated cart
    await cart.save();

    res.status(200).json({ message: " Quantity updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};




// Clear Entire Cart
export const clearCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    await Cart.findOneAndUpdate({ userId }, { items: [], total: 0 });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
