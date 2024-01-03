import { Types } from "mongoose";

export type TStatus = "placed" | "shipped" | "delivered" | "canceled";
export type TShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
};
export type TOrder = {
  products: Types.ObjectId[];
  totalPrice: number;
  customer: Types.ObjectId;
  status: TStatus;
  invoice: string;
  shippingInfo: TShippingInfo;
};
