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
    message: "Order created successfully",
    data: result,
  });
});
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getAllOrders(req?.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders fetched successfully",
    meta: result.meta,
    data: result.result,
  });
});
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getSingleOrder(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order fetched successfully",
    data: result,
  });
});
const getOrderForCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getOrderForCustomer(
    req.user.userId,
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order fetched successfully",
    meta: result.meta,
    data: result.result,
  });
});
const getOrderForVendor = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getOrderForVendor(
    req.user.userId,
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order fetched successfully",
    meta: result.meta,
    data: result.result,
  });
});

export const OrderControllers = {
  addOrder,
  getAllOrders,
  getSingleOrder,
  getOrderForCustomer,
  getOrderForVendor,
};
