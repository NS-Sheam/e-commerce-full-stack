import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import config from "../../config";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: { accessToken, refreshToken },
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.changePassword(req.user, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Token refreshed successfully",
    data: result,
  });
});
const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await AuthServices.forgetPassword(email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reset link generated successfully",
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.resetPassword(
    req.body,
    req.headers.authorization as string,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password reset successfully",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
