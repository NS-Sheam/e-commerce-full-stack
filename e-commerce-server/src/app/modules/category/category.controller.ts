import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./category.service";
import catchAsync from "../../utils/catchAsync";

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategories();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories fetched successfully",
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
};
