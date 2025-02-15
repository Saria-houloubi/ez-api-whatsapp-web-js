import { Request, Response, NextFunction } from "express";

// Custom Error Interface
interface ErrorResponse extends Error {
  status?: number;
}

// Global Error Handling Middleware
export function errorHandlerMiddleware(
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`Error: ${err.message}`); // Log the error

  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
}

export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
