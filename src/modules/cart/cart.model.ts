import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number; 
  subtotal?: number; 
  image?: string;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

// Cart Item Schema
const cartItemSchema = new Schema<ICartItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    subtotal: { type: Number },
    image: { type: String },
  },
  { _id: false }
);

// Cart Schema
const cartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [cartItemSchema],
    total: { type: Number, default: 0 }, 
  },
  { timestamps: true }
);

// Middleware to auto-calculate subtotal & total
cartSchema.pre("save", function (next) {
  this.items.forEach((item) => {
    item.subtotal = item.price * item.quantity;
  });
  this.total = this.items.reduce((acc, item) => acc + (item.subtotal || 0), 0);
  next();
});

export const Cart = mongoose.model<ICart>("Cart", cartSchema);
