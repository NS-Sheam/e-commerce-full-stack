import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.createProduct(
    req.body,
    req.user,
    req.files,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

const getAllProuducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getAllProducts(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All products fetched successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProduct(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.updateProduct(id, req.body, req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ProductServices.deleteProduct(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

export const productControllers = {
  createProduct,
  getAllProuducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
