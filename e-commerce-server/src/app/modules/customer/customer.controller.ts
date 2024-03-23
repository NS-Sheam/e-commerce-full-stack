import { Request, Response } from "express";
import { CustomerServices } from "./customer.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const result = await CustomerServices.getAllCustomers(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All customers fetched successfully",
    data: result,
  });
});

const getSingleCustomer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CustomerServices.getSingleCustomer(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer fetched successfully",
    data: result,
  });
});

const updateCustomer = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { customer } = req.body;
  const result = await CustomerServices.updateCustomer(userId, customer);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer updated successfully",
    data: result,
  });
});

const updateWishList = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { productId } = req.body;

  const result = await CustomerServices.updateWishList(userId, productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Wishlist updated successfully",
    data: result,
  });
});
const updateShoppingCart = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { productId } = req.body;

  const result = await CustomerServices.updateShoppingCart(userId, productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Wishlist updated successfully",
    data: result,
  });
});

const deleteCustomer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CustomerServices.deleteCustomer(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer deleted successfully",
    data: result,
  });
});

export const CustomerControllers = {
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
  updateWishList,
  updateShoppingCart,
  deleteCustomer,
};
