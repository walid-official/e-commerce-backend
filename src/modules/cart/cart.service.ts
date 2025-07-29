import mongoose from "mongoose";
import { Cart } from "./cart.model";

// Add item to cart
export const addToCartService = async (userId: string, productId: string, quantity: number) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const productObjectId = new mongoose.Types.ObjectId(productId);

  let cart = await Cart.findOne({ userId: userObjectId });

  if (!cart) {
    cart = new Cart({
      userId: userObjectId,
      items: [{ productId: productObjectId, quantity }]
    });
  } else {
    const existingItem = cart.items.find(i => i.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId: productObjectId, quantity });
    }
  }

  return await cart.save();
};


export const getCartService = async (userId: string) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  return await Cart.findOne({ userId: userObjectId }).populate("items.productId", "name price image");
};

export const deleteCartService = async (userId: string) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  return await Cart.findOneAndDelete({ userId: userObjectId });
};