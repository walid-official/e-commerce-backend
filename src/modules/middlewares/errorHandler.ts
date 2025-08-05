import { Request, Response, NextFunction } from "express";

// Custom error interface
export interface AppError extends Error {
  statusCode?: number;
}

// Global error handler
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("🔥 Error:", err.message);

  const status = err.statusCode || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};
