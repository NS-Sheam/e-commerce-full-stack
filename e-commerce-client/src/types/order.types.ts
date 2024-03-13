import { TCustomer, TProduct } from ".";
export interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}
export type TOrder = {
  _id: string;
  products: TProduct[];
  totalPrice: number;
  customer: TCustomer;
  status: string;
  invoice: string;
  shippingInfo: ShippingInfo;
  transactionId: string;
  paymentStatus: boolean;
  createdAt: string;
  updatedAt: string;
};
