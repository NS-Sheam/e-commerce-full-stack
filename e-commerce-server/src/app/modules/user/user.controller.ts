import { Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const { password, customer } = req.body;

  const result = await UserServices.createCustomer(password, customer);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer created successfully",
    data: result,
  });
});

const createVendor = catchAsync(async (req: Request, res: Response) => {
  const { password, vendor } = req.body;

  const result = await UserServices.createVendor(password, vendor);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor created successfully",
    data: result,
  });
});
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { password, admin } = req.body;

  const result = await UserServices.createAdmin(password, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await UserServices.getMe(token as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

export const UserControllers = {
  createCustomer,
  createVendor,
  createAdmin,
  getMe,
};
