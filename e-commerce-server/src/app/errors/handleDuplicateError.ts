import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extracted_msg = match ? match[1] : "Duplicate Error";
  const statusCode = 400;
  const errorSources: TErrorSource[] = [
    {
      path: "",
      message: `${extracted_msg} already exists`,
    },
  ];

  return {
    statusCode,
    message: "Duplicate Error",
    errorSources,
  };
};

export default handleDuplicateError;
