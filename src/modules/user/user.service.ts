
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './User.model';

const SALT_ROUNDS = 10;

export const signup = async (userData: { name: string; email: string; phone: string; password: string }) => {
  const { name, email, phone, password } = userData;

  // Check if email or phone exists
  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) throw new Error('Email or Phone already registered');

  // Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create user
  const user = new User({ name, email, phone, password: hashedPassword });
  await user.save();

  return user;
};

export const login = async (emailOrPhone: string, password: string) => {
  // Find user by email or phone
  const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
  if (!user) throw new Error('User not found');

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  // Create JWT token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );

  return { token, user };
};
