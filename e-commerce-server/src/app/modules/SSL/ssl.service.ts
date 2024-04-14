import axios from "axios";
import config from "../../config";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TInitPaymentData } from "./ssl.interface";

const initPayment = async (paymentData: TInitPaymentData) => {
  try {
    const data = {
      store_id: config.sslc_store_id,
      store_passwd: config.sslc_store_password,
      is_live: false,
      total_amount: paymentData.totalPrice,
      currency: "BDT",
      tran_id: paymentData.transactionId,
      success_url: `${config.server_url}/orders/payment/success/${paymentData.transactionId}`,
      fail_url: `${config.server_url}/orders/payment/failed/${paymentData.transactionId}`,
      cancel_url: `${config.server_url}/orders/payment/failed/${paymentData.transactionId}`,
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      // products: productsForSSLCommerz, // Array of products
      product_name: paymentData.productsName,
      product_category: paymentData.categories,
      product_profile: "general",
      cus_name: `${paymentData.customer.name.firstName} ${paymentData.customer.name.lastName}`,
      cus_email: paymentData.customer.email,
      cus_add1: paymentData.payload.shippingInfo?.address,
      cus_add2: paymentData.payload.shippingInfo?.address,
      cus_city: paymentData.payload.shippingInfo?.city,
      cus_state: paymentData.payload.shippingInfo?.state,
      cus_postcode: paymentData.payload.shippingInfo?.postalCode || 1216,
      cus_country: paymentData.payload.shippingInfo?.country || "Bangladesh",
      cus_phone: paymentData.customer.mobileNo,
      cus_fax: paymentData.customer.mobileNo,
      ship_name: `${paymentData.customer.name.firstName} ${paymentData.customer.name.lastName}`,
      ship_add1: paymentData.payload.shippingInfo?.address,
      ship_add2: paymentData.payload.shippingInfo?.address,
      ship_city: paymentData.payload.shippingInfo?.city,
      ship_state: paymentData.payload.shippingInfo?.state,
      ship_postcode: paymentData.payload.shippingInfo?.postalCode || 1216,
      ship_country: paymentData.payload.shippingInfo?.country || "Bangladesh",
    };

    const response = await axios({
      method: "POST",
      url: config.sslc_payment_api,
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to initiate payment");
  }
};
const validatePayment = async (payload: Record<string, unknown>) => {
  try {
    if (!payload || !payload.status || payload.status !== "VALID") {
      return {
        message: "Invalid payment",
      };
    }

    const response = await axios({
      method: "GET",
      url: `${config.sslc_validation_api}?val_id=${payload.val_id}&store_id=${config.sslc_store_id}&store_passwd=${config.sslc_store_password}&format=json`,
    });
    return response.data;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "Payment validation failed");
  }
};

export const SSLService = {
  initPayment,
  validatePayment,
};
