import { Request, Response } from 'express';
import * as userService from './user.service';

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await userService.signup(req.body);
    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { emailOrPhone, password } = req.body;
    const result = await userService.login(emailOrPhone, password);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
