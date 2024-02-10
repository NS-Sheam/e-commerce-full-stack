import { Request, Response } from "express";
import { ReviewServices } from "./review.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const addReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.addReview(req.user, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review added successfully",
    data: result,
  });
});

const getReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.getReviews(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reviews fetched successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewServices.getSingleReview(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review fetched successfully",
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewServices.updateReview(id, req.user, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review updated successfully",
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewServices.deleteReview(id, req.user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review deleted successfully",
    data: result,
  });
});

export const ReviewControllers = {
  addReview,
  getReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
