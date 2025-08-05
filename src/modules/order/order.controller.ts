// order.controller.ts
import { Request, Response } from "express";
import { Order } from "./order.model";
import { AuthRequest } from "../middlewares/auth.middleware";

export const createOrderController = async (req: AuthRequest, res: Response) => {
  console.log(req.user)
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const order = new Order({
      userId: req.user.id, 
      items: req.body.items,
      location: req.body.location,
      totalAmount: req.body.totalAmount,
      paymentMethod: req.body.paymentMethod || "COD",
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const getUserOrdersController = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const orders = await Order.find({ userId: req.user.id });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

export const getAllOrdersController = async (req: AuthRequest, res: Response) => {
  try {
    // Check if user is admin
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }
    const orders = await Order.find().populate("items.productId", "name price image");
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch all orders" });
  }
};


// GET /api/orders/:orderId
export const getOrderByOrderIdController = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const order = await Order.findById(orderId).populate("items.productId", "name price image");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch order by ID" });
  }
};
