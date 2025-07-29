import { Response } from "express";
import { addToCartService, getCartService } from "./cart.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const addToCartController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { productId, quantity } = req.body;
    const cart = await addToCartService(userId, productId, quantity);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

export const getCartController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const cart = await getCartService(userId);
    res.json(cart);
  } catch {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};
