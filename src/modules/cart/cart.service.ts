import { Cart } from "./cart.model";


// Add item to cart
export const addToCartService = async (userId: string, productId: string, quantity: number) => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [{ productId, quantity }] });
  } else {
    const existingItem = cart.items.find((i) => i.productId === productId);
    if (existingItem) existingItem.quantity += quantity;
    else cart.items.push({ productId, quantity });
  }

  cart.updatedAt = new Date();
  return await cart.save();
};

// Get user cart
export const getCartService = async (userId: string) => {
  return await Cart.findOne({ userId });
};

// Remove item
export const removeCartItemService = async (userId: string, productId: string) => {
  return await Cart.findOneAndUpdate({ userId }, { $pull: { items: { productId } } }, { new: true });
};

// Clear cart after order
export const clearCartService = async (userId: string) => {
  return await Cart.findOneAndUpdate({ userId }, { items: [] }, { new: true });
};
