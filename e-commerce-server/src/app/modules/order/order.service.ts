/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Product } from "../product/product.model";
import { TProduct } from "../product/product.interface";
import { JwtPayload } from "jsonwebtoken";
import { Customer } from "../customer/customer.model";
import { sendOrderConfirmation } from "../../utils/sendOrderConfirmationEmail";
import { Vendor } from "../vendor/vendor.model";
import { TVendor } from "../vendor/vendor.interface";

const addOrder = async (user: JwtPayload, payload: TOrder) => {
  let totalPrice = 0;

  const customer = await Customer.findOne({ user: user.userId });
  if (!customer) {
    throw new AppError(httpStatus.BAD_REQUEST, "Customer not found");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Transaction 1: Update Product Inventory
    for (const productId of payload.products) {
      const product = (await Product.findById(productId)) as TProduct;
      if (!product) {
        throw new AppError(httpStatus.BAD_REQUEST, "Product not found");
      }
      if (product.inventory.quantity < 1) {
        throw new AppError(httpStatus.BAD_REQUEST, "Product out of stock");
      }
      totalPrice += product.price;
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $inc: { "inventory.quantity": -1 } },
        { session, new: true },
      );

      if (!updatedProduct) {
        throw new AppError(httpStatus.BAD_REQUEST, "Product update failed");
      }
    }
    payload.customer = customer._id;
    payload.totalPrice = totalPrice;
    payload.invoice = `INV-${Date.now()}`;
    // Transaction 1: Create Order
    const newOrder = await Order.create([payload], { session });

    if (!newOrder) {
      throw new AppError(httpStatus.BAD_REQUEST, "Order creation failed");
    }
    await session.commitTransaction();
    await session.endSession();

    const vendors: TVendor[] = [];
    const products = await Product.find({ _id: { $in: payload.products } });

    for (const product of products) {
      const user = product.vendor;
      const vendor = await Vendor.findOne({ user });
      if (!vendor) {
        throw new AppError(httpStatus.BAD_REQUEST, "Vendor not found");
      }
      vendors.push(vendor);
    }

    sendOrderConfirmation(customer, vendors, products, payload.invoice);
    return newOrder[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Order creation failed");
  }
};

export const OrderServices = {
  addOrder,
};
