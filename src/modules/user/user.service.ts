import bcrypt from "bcrypt";
import { User } from "./User.model";
import { generateToken } from "../../utils/jwt";
import mongoose from "mongoose";

const SALT_ROUNDS = 10;

export const signup = async (userData: { name: string; email: string; phone: string; password: string }) => {
  const { name, email, phone, password } = userData;

  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) throw new Error("Email or Phone already registered");
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = new User({ name, email, phone, password: hashedPassword });
  await user.save();
  const token = generateToken({ id: user._id, role: user.role });

  return { token, user };
};

export const login = async (emailOrPhone: string, password: string) => {

  const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken({ id: user._id, role: user.role });
  return { token, user };
};

// Fetch all users (for admin)
export const getAllUsersService = async () => {
  return await User.find().select("-password"); 
};

// Fetch logged-in user (by ID)
export const getLoggedInUserService = async (userId: string) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  return await User.findById(userObjectId).select("-password");
};