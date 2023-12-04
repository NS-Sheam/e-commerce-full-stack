import { Types } from "mongoose";

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TCustomer = {
  user: Types.ObjectId;
  name: TName;
  gender: "male" | "female" | "other";
  email: string;
  mobileNo: string;
  image?: string;
  isDeleted: boolean;
};
