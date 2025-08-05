import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoURI:
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pxdhv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0` ||
    process.env.MONGO_LOCAL_URI,
};

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI as string);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error', error);
    process.exit(1);
  }
};
