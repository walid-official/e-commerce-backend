import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { addToCartController, getCartController } from "./cart.controller";

const router = Router();

router.post("/", authenticate, addToCartController);
router.get("/", authenticate, getCartController);

export default router;