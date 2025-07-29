import express from "express";
import { createOrderController } from "./order.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = express.Router();
router.post("/", authenticate, createOrderController);

export default router;