import { Request, Response } from "express";
import { vendorServices } from "./vendor.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const getAllVendors = catchAsync(async (req: Request, res: Response) => {
  const result = await vendorServices.getAllVendors(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All vendors fetched successfully",
    data: result,
  });
});

const getSingleVendor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await vendorServices.getSingleVendor(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor fetched successfully",
    data: result,
  });
});

const updateVendor = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { vendor } = req.body;
  const result = await vendorServices.updateVendor(req.file, userId, vendor);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor updated successfully",
    data: result,
  });
});

const deleteVendor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await vendorServices.deleteVendor(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor deleted successfully",
    data: result,
  });
});

export const vendorControllers = {
  getAllVendors,
  getSingleVendor,
  updateVendor,
  deleteVendor,
};
