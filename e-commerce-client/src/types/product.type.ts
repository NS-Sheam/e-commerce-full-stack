import { TUser } from "./userManagement.type";

export type TCatgeory = {
  _id: string;
  name: string;
  image: string;
};

export type TProductReview = {
  customer: TUser;
  product: string;
  rating: number;
  description?: string;
};

export type TProduct = {
  _id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  images: string[];
  category: TCatgeory;
  vendor: string;
  inventory: {
    quantity: number;
    lowSockNotification: string;
  };
  discount: number;
  productReview: TProductReview[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
