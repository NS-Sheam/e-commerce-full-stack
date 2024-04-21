import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { PaymentService } from "./payment.service";
import sendResponse from "../../utils/sendResponse";

const initPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.initPayment();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment initiated successfully",
    data: result,
  });
});

const validatePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.validatePayment();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment validated successfully",
    data: result,
  });
});

export const PaymentController = {
  initPayment,
  validatePayment,
};
