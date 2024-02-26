import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./category.service";
import catchAsync from "../../utils/catchAsync";

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategory(req.file, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategories(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories fetched successfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.updateCategory(
    req.params.id,
    req?.file,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category updated successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.deleteCategory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category deleted successfully",
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
