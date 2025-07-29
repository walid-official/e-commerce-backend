import { Request, Response } from "express";
import { login, signup } from "./user.service";

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

