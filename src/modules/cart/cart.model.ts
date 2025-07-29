import mongoose, { Schema, Document } from "mongoose";

// Define Cart Item Interface
export interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

// Define Cart Interface
export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

// Create Cart Schema
const cartItemSchema = new Schema<ICartItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const cartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

// Create & Export Cart Model
export const Cart = mongoose.model<ICart>("Cart", cartSchema);