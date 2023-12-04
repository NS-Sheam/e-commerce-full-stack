import { Types } from "mongoose";

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TVendor = {
  user: Types.ObjectId;
  name: TName;
  email: string;
  mobileNo: string;
  image: string;
  orderHistory?: string[];
  review?: Types.ObjectId[];
  isDeleted: boolean;
};
