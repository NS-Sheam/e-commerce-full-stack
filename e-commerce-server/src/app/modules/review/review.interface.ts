import { Types } from "mongoose";

export type TReview = {
  customer: Types.ObjectId;
  product: Types.ObjectId;
  rating: number;
  description?: string;
  isDeleted: boolean;
};
