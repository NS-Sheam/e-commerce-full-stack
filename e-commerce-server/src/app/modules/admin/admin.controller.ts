import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { adminServices } from "./admin.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const result = await adminServices.getAllAdmins(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All admins fetched successfully",
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminServices.getSingleAdmin(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin fetched successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await adminServices.updateAdmin(id, admin);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await adminServices.deleteAdmin(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
