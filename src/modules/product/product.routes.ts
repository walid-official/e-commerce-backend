import express from "express";
import { getProducts, getProductById } from "./product.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = express.Router();

router.get("/",  getProducts);

router.get("/:id", authenticate, getProductById);

export default router;
