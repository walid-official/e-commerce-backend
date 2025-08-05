import express from "express";
import { getProductById, getHomeProducts, getAllProducts, createProducts } from "./product.controller";
import { authenticate } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/",  createProducts);
router.get("/",  getHomeProducts);
router.get("/all-products",  getAllProducts);
router.get("/:id", authenticate, getProductById);

export default router;