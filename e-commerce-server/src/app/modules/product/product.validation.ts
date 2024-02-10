import { z } from "zod";

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Product name is required",
    }),
    description: z.string({
      required_error: "Product description is required",
    }),
    brand: z.string({
      required_error: "Product brand is required",
    }),
    price: z.number({
      required_error: "Product price is required",
    }),
    category: z.string({
      required_error: "Product category is required",
    }),
    inventory: z.object({
      quantity: z.number({
        required_error: "Product quantity is required",
      }),
      lowSockNotification: z.enum(["Yes", "No"]).default("No"),
    }),
    discount: z.number().optional(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    brand: z.string().optional(),
    price: z.number().optional(),
    images: z.array(z.string()).optional(),
    category: z.string().optional(),
    inventory: z
      .object({
        quantity: z.number().optional(),
        lowSockNotification: z.enum(["Yes", "No"]).optional(),
      })
      .optional(),
    discount: z.number().optional(),
  }),
});

export const ProductValidationSchema = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
