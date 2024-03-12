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
import QueryBuilder from "../../builder/QueryBuilder";
import { orderSearchableFields } from "./order.const";
import SSLCommerzPayment from "sslcommerz-lts";
const store_id = "<your_store_id>";
const store_passwd = "<your_store_password>";
const is_live = false;
const addOrder = async (user: JwtPayload, payload: TOrder) => {
  let totalPrice = 0;
  const customer = await Customer.findOne({ user: user.userId });
  if (!customer) {
    throw new AppError(httpStatus.BAD_REQUEST, "Customer not found");
  }
  const vendors: TVendor[] = [];
  const transactionId = new mongoose.Types.ObjectId().toString();

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const productsForSSLCommerz: any[] = []; // Array to store products for sslcommerz data

    for (const productId of payload.products) {
      const product = (await Product.findById(productId)) as TProduct;
      if (!product) {
        throw new AppError(httpStatus.BAD_REQUEST, "Product not found");
      }
      if (product.inventory.quantity < 1) {
        throw new AppError(httpStatus.BAD_REQUEST, "Product out of stock");
      }
      const vendorId = product?.vendor;

      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
        throw new AppError(httpStatus.BAD_REQUEST, "Vendor not found");
      }
      if (!vendors.find((v) => v.user === vendor.user)) {
        vendors.push(vendor);
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

      // Add product details to array for sslcommerz data
      productsForSSLCommerz.push({
        name: product.name,
        category: product.category,
        quantity: 1, // Assuming quantity is always 1 for each product in this example
        price: product.price,
      });
    }

    payload.customer = customer._id;
    payload.totalPrice = totalPrice;
    payload.invoice = `INV-${Date.now()}`;

    // Transaction 1: Create Order
    const newOrder = await Order.create([payload], { session });
    if (!newOrder) {
      throw new AppError(httpStatus.BAD_REQUEST, "Order creation failed");
    }

    // SSLCommerz data
    const sslCommerzData = {
      total_amount: totalPrice,
      currency: "BDT",
      tran_id: transactionId,
      success_url: "http://localhost:3030/success",
      fail_url: "http://localhost:3030/fail",
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      products: productsForSSLCommerz, // Array of products
      cus_name: customer.name,
      cus_email: customer.email,
      cus_add1: payload.shippingInfo?.address,
      cus_add2: payload.shippingInfo?.address,
      cus_city: payload.shippingInfo?.city,
      cus_state: payload.shippingInfo?.state,
      cus_postcode: payload.shippingInfo?.postalCode,
      cus_country: payload.shippingInfo?.country,
      cus_phone: customer.mobileNo,
      cus_fax: customer.mobileNo,
      ship_name: `${customer.name.firstName} ${customer.name.lastName}`,
      ship_add1: payload.shippingInfo?.address,
      ship_add2: payload.shippingInfo?.address,
      ship_city: payload.shippingInfo?.city,
      ship_state: payload.shippingInfo?.state,
      ship_postcode: payload.shippingInfo?.postalCode,
      ship_country: payload.shippingInfo?.country,
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(sslCommerzData);

    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    // Assuming `res` is available in this scope
    res.redirect(GatewayPageURL);
    console.log("Redirecting to: ", GatewayPageURL);

    // Send order confirmation
    sendOrderConfirmation(customer, vendors, payload.products, payload.invoice);

    await session.commitTransaction();
    await session.endSession();

    return newOrder[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Order creation failed");
  }
};

const getAllOrders = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    Order.find()
      .populate({
        path: "products",
        populate: {
          path: "vendor",
        },
      })
      .populate("customer"),
    query,
  )
    .search(orderSearchableFields)
    .filter()
    .sort()
    .paginate();

  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();
  return { result, meta };
};

const getSingleOrder = async (orderId: string) => {
  const result = await Order.findById(orderId)
    .populate({
      path: "products",
      populate: {
        path: "vendor",
      },
    })
    .populate("customer");
  return result;
};

const getOrderForCustomer = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const customer = await Customer.findOne({ user: userId });
  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
  }
  const customerOrderQuery = new QueryBuilder(
    Order.find({
      customer: customer._id,
    })
      .populate({
        path: "products",
        populate: {
          path: "vendor",
        },
      })
      .populate("customer"),
    query,
  );
  const result = await customerOrderQuery.modelQuery;
  const meta = await customerOrderQuery.countTotal();
  return { result, meta };
};

const getOrderForVendor = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const vendor = await Vendor.findOne({ user: userId });
  if (!vendor) {
    throw new AppError(httpStatus.NOT_FOUND, "Vendor not found");
  }

  const products = await Product.find({ vendor: vendor._id });

  const vendorOrderQuery = new QueryBuilder(
    Order.find({
      products: { $in: products.map((p) => p._id) },
    })
      .populate({
        path: "products",
        populate: {
          path: "vendor",
        },
      })
      .populate("customer"),
    query,
  );

  const result = await vendorOrderQuery.modelQuery;
  const meta = await vendorOrderQuery.countTotal();
  return { result, meta };
};

export const OrderServices = {
  addOrder,
  getAllOrders,
  getSingleOrder,
  getOrderForCustomer,
  getOrderForVendor,
};
