import { Response } from "express";
import { addToCartService, deleteCartService, getCartService } from "./cart.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

// Add to Cart
export const addToCartController = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ error: "Product ID and quantity are required" });
    }

    const cart = await addToCartService(req.user.id, productId, quantity);
    return res.status(200).json(cart);
  } catch (err) {
    console.error("Add to cart error:", err);
    return res.status(500).json({ error: "Failed to add to cart" });
  }
};

// Get Cart
export const getCartController = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const cart = await getCartService(req.user.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cart);
  } catch (err) {
    console.error("Get cart error:", err);
    return res.status(500).json({ error: "Failed to fetch cart" });
  }
};

export const deleteCartController = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) return res.status(401).json({ error: "Unauthorized" });

    const deletedCart = await deleteCartService(req.user.id);
    if (!deletedCart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch {
    res.status(500).json({ error: "Failed to delete cart" });
  }
};