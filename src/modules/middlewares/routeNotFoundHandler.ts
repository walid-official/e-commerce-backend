import { Request, Response } from "express";

const routeNotFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found",
    success: false,
    error: {
      name: "404 Not found",
      message: "The requested route does not exist on the server",
      path: req.originalUrl,
      method: req.method,
    },
  });
};

export default routeNotFoundHandler;