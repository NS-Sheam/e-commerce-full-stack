/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import config from "../config";
import { TCustomer } from "../modules/customer/customer.interface";
import { TVendor } from "../modules/vendor/vendor.interface";
import { TProduct } from "../modules/product/product.interface";

type TMailOption = {
  from: string | undefined;
  to: string;
  subject: string;
  html: string;
};

export const sendOrderConfirmation = async (
  customer: TCustomer,
  vendors: any,
  products: TProduct[],
  invoice: string,
) => {
  const transporter = nodemailer.createTransport({
    host: config.email_host,
    port: Number(config.email_port),
    secure: config.NODE_ENV === "production", // `true` for port 465, `false` for all other ports
    auth: {
      user: config.email_user,
      pass: config.email_password,
    },
  });

  // Email to Customer
  const customerMailOptions = {
    from: config.email_from,
    to: customer.email,
    subject: "Your order has been placed", // Subject line for Customer
    html: `
          <p>Hello ${`${customer?.name?.firstName} ${customer?.name?.middleName} ${customer?.name?.lastName}`},</p>
          <p>Your order has been confirmed.</p>
          <p>Please find the details below:</p>
          <p>Order Details:</p>
          ${
            products.length > 0
              ? `
            <ul>
              ${products.map(
                (product) => `
                <li>
                  <strong>Product Name:</strong> ${product.name}
                  <strong>Product Price:</strong> ${product.price}
                </li>
              `,
              )}
            </ul>
            <p>Total Price: <strong>${products.reduce(
              (acc, product) => acc + product.price,
              0,
            )}</strong></p>
            Your invoice number is: <strong>${invoice}</strong>
          `
              : ""
          }
          <p>Thank you for shopping with us.</p>
        `,
  };

  // Email to vendors
  const vendorMailOptions: TMailOption[] = vendors?.map(
    (vendor: TVendor & { _id: string }) => {
      return {
        from: config.email_from,
        to: vendor.email,
        subject: "New order has been placed", // Subject line for Vendor
        html: `
          <p>Hello ${`${vendor?.name?.firstName} ${vendor?.name?.middleName} ${vendor?.name?.lastName}`},</p>
          <p>A new order has been placed.</p>
          <p>Please find the details below:</p>
          <p>Order Details:</p>
          ${
            products.length > 0
              ? `
            <ul>
              ${products.map((product) => {
                if (product.vendor._id.toString() === vendor?._id.toString()) {
                  return `
                    <li>
                      <strong>Product Name:</strong> ${product.name}
                      <strong>Product Price:</strong> ${product.price}
                    </li>
                  `;
                }
              })}
            </ul>
            <p>Total Price: <strong>${products.reduce((acc, product) => {
              if (product.vendor._id.toString() === vendor._id.toString()) {
                return acc + product.price;
              }
              return acc;
            }, 0)}</strong></p>
            Customer's invoice number is: <strong>${invoice}</strong>
          `
              : ""
          }
          <p>Thank you for shopping with us.</p>
        `,
      };
    },
  );

  try {
    // Send emails to both customer and provider
    await transporter.sendMail(customerMailOptions);
    await Promise.all(
      vendorMailOptions.map((vendorMailOption) =>
        transporter.sendMail(vendorMailOption),
      ),
    );
  } catch (error) {
    throw new Error("Failed to send booking confirmation emails");
  }
};
