import { Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const { userName, password, customer } = req.body;

  const result = await UserServices.createCustomer(
    userName,
    password,
    customer,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer created successfully",
    data: result,
  });
});

const createVendor = catchAsync(async (req: Request, res: Response) => {
  const { userName, password, vendor } = req.body;
  const result = await UserServices.createVendor(userName, password, vendor);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor created successfully",
    data: result,
  });
});

export const UserControllers = {
  createCustomer,
  createVendor,
};
