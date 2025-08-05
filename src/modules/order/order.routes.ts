import express from "express";
import { createOrderController, getAllOrdersController,  getOrderByOrderIdController,  getUserOrdersController } from "./order.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authenticate, createOrderController);
router.get("/", authenticate, getUserOrdersController);
router.get("/all", authenticate, getAllOrdersController);
router.get("/:orderId", authenticate, getOrderByOrderIdController);

export default router;