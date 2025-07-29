import bcrypt from "bcrypt";
import { User } from "./User.model";
import { generateToken } from "../../utils/jwt";

const SALT_ROUNDS = 10;

export const signup = async (userData: { name: string; email: string; phone: string; password: string }) => {
  const { name, email, phone, password } = userData;

  // ✅ Check if email or phone already exists
  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) throw new Error("Email or Phone already registered");

  // ✅ Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // ✅ Create user
  const user = new User({ name, email, phone, password: hashedPassword });
  await user.save();

  // ✅ Generate token (JWT)
  const token = generateToken({ id: user._id, role: user.role });

  return { token, user };
};

export const login = async (emailOrPhone: string, password: string) => {
  // ✅ Find user by email or phone
  const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
  if (!user) throw new Error("User not found");

  // ✅ Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  // ✅ Generate token
  const token = generateToken({ id: user._id, role: user.role });

  return { token, user };
};
