import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  currency: String,
  sizes: [String],
  colors: [String],
  material: String,
  description: String,
  image: String,
  inStock: Boolean,
  quantity: Number
});

export const Product = mongoose.model("Product", productSchema);