import { Response } from "express";

type TMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: TMeta;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  return res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data?.meta,
    data: data?.data,
  });
};

export default sendResponse;
