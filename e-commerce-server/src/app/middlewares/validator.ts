import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import AppError from "../errors/AppError";

// Allowed routes and methods configuration
const EXCLUDED_ROUTES = [{ path: "/api/v1/auth/login", methods: ["POST"] }];

const validator = (req: Request, res: Response, next: NextFunction) => {
  const restrictedMethods = ["POST", "PATCH", "PUT", "DELETE"];

  // Check if request method is restricted
  if (restrictedMethods.includes(req.method)) {
    // Check if the route is excluded
    const isExcluded = EXCLUDED_ROUTES.some(
      (route) =>
        req.path.startsWith(route.path) && route.methods.includes(req.method),
    );

    if (!isExcluded) {
      throw new AppError(
        httpStatus.METHOD_NOT_ALLOWED,
        "This is a demo version. You are not allowed to perform this action.",
      );
    }
  }

  next();
};

export default validator;
// customer123@gmail.com // customer123
// 123sheamfeni@gmail.com //123456
