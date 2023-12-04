import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = 400;
  const message = "Zod validation error";
  const errorSources: TErrorSource[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleZodError;
