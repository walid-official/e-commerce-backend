import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { addToCart, getAllCartsForUsers, getUserAllCarts, removeCartItem, updateCartItemQuantity } from "./cart.controller";

const router = Router();

router.post("/add", authenticate, addToCart);
router.get("/all-users", getAllCartsForUsers); 
router.get("/:userId", getUserAllCarts);
router.patch("/update-quantity", updateCartItemQuantity);
router.delete("/remove", authenticate, removeCartItem);

export default router;