import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { OrderServices } from "./order.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const addOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.addOrder(req.user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getAllOrders(req?.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully",
    meta: result.meta,
    data: result.result,
  });
});

export const OrderControllers = {
  addOrder,
  getAllOrders,
};
