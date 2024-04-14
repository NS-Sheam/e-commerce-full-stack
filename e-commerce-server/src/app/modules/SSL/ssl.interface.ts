import { Types } from "mongoose";
import { TCustomer } from "../customer/customer.interface";
import { TShippingInfo } from "../order/order.interface";

type TPayload = {
  products: Types.ObjectId[];
  shippingInfo: TShippingInfo;
};

export type TInitPaymentData = {
  totalPrice: number;
  transactionId: string;
  customer: TCustomer;
  payload: TPayload;
  productsName: string;
  categories: string;
};
