import { z } from "zod";

const addOrderValidationSchema = z.object({
  body: z.object({
    products: z.array(z.string()),
    shippingInfo: z.object({
      address: z.string(),
      city: z.string(),
      state: z.string(),
      country: z.string().default("Bangladesh"),
      postalCode: z.string().optional(),
    }),
  }),
});

export const OrderValidations = {
  addOrderValidationSchema,
};
