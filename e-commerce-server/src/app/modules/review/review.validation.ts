import { z } from "zod";

const createReviewValidationSchema = z.object({
  body: z.object({
    product: z.string({
      required_error: "Product is required",
    }),
    rating: z.number({
      required_error: "Rating is required",
    }),
    description: z.string().optional(),
  }),
});

const updateReviewValidationSchema = z.object({
  body: z.object({
    rating: z.number().optional(),
    description: z.string().optional(),
  }),
});

export const ReviewValidations = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};
