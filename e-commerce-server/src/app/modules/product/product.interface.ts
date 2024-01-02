import { Types } from "mongoose";

export type TInventory = {
  quantity: number;
  lowSockNotification: "Yes" | "No";
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  vendor: Types.ObjectId;
  inventory: TInventory;
  discount?: number;
  productReview?: Types.ObjectId[];
  isDeleted: boolean;
};
