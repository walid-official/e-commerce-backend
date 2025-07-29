import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  userId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  totalAmount: number;
  paymentMethod: "COD" | "Bkash" | "Nagad";
  status: "pending" | "processing" | "completed";
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["COD", "Bkash", "Nagad"], default: "COD" },
  status: { type: String, enum: ["pending", "processing", "completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export const Order =  mongoose.model<IOrder>("Order", orderSchema);
