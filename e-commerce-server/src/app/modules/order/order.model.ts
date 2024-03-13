import { Schema, model } from "mongoose";
import { TOrder, TShippingInfo } from "./order.interface";
import { orderStatus } from "./order.const";

const shippingInfoSchema = new Schema<TShippingInfo>(
  {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: String,
    country: {
      type: String,
      required: true,
      default: "Bangladesh",
    },
    postalCode: String,
  },
  {
    _id: false,
  },
);

const orderSchema = new Schema<TOrder>(
  {
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    status: {
      type: String,
      enum: orderStatus,
      required: true,
      default: "placed",
    },
    invoice: {
      type: String,
      required: true,
      unique: true,
    },
    shippingInfo: {
      type: shippingInfoSchema,
      required: true,
    },
    transactionId: String,
    paymentStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model<TOrder>("Order", orderSchema);
