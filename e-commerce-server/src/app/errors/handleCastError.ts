import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const message = "Invalid path";

  const errorSources: TErrorSource[] = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleCastError;
