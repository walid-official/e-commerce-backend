import { Request, Response } from "express";
import { createOrderService } from "./order.service";


export const createOrderController = async (req: Request, res: Response) => {
  try {
    const order = await createOrderService(req.body);
    res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
};
