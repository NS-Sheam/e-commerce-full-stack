import { Types } from "mongoose";

export type TInventory = {
  quantity: number;
  lowSockNotification: string;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  vendor: Types.ObjectId;
  inventory: TInventory;
  discount?: number;
  productReview?: Types.ObjectId[];
  isDeleted: boolean;
};
