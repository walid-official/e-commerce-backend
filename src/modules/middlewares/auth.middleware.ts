import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

interface DecodedUser extends JwtPayload {
  id: string;
  role?: string;
}
export interface AuthRequest extends Request {
  user?: { id: string; role?: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid token format" });

  try {
    const decoded = verifyToken(token) as DecodedUser;
    if (!decoded.id) {
      return res.status(401).json({ error: "Invalid token payload" });
    }
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};