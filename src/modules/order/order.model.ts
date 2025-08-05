import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  userId: string;
  items: { productId: string; quantity: number }[];
  location: { address: string; city: string; district: string; postalCode?: string };
  totalAmount: number;
  paymentMethod: "COD";
  status: "pending" | "confirmed" | "delivered";
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  userId: { type: String, required: true },
  items: [{ productId: String, quantity: Number }],
  location: {
    address: String,
    city: String,
    district: String,
    postalCode: { type: String, required: false }
  },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["COD"], default: "COD" },
  status: { type: String, enum: ["pending", "confirmed", "delivered"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export const Order = mongoose.model<IOrder>("Order", orderSchema);