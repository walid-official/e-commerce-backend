import express from "express";
import { createOrderController } from "./order.controller";


const router = express.Router();
router.get("/", createOrderController);

export default router;