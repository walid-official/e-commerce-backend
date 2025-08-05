import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

// Create Mongo URI safely
const mongoURI =
  process.env.DB_USER && process.env.DB_PASS && process.env.DB_NAME
    ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pxdhv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    : process.env.MONGO_LOCAL_URI;

if (!mongoURI) {
  throw new Error('❌ MongoDB URI not provided in environment variables');
}

export const config = {
  port: process.env.PORT || 5000,
  mongoURI,
};

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Exit process on failure
  }
};
