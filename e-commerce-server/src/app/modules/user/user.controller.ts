import { Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createCustomer = async (req: Request, res: Response) => {
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
};

export const UserControllers = {
  createCustomer,
};
