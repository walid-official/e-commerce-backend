import { Request, Response } from "express";
import { getAllUsersService, getLoggedInUserService, login, signup } from "./user.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const signupController = async (req: Request, res: Response) => {
  try {
    const { token, user } = await signup(req.body);
    res.status(201).json({ message: "Signup successful", token, user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { emailOrPhone, password } = req.body;
    const { token, user } = await login(emailOrPhone, password);
    res.json({ message: "Login successful", token, user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Fetch All Users (Admin Only)
export const getAllUsersController = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }

    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

//  Fetch Logged-in User Profile
export const getLoggedInUserController = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await getLoggedInUserService(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};
