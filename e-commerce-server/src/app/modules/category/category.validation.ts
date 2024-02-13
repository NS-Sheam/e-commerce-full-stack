import { z } from "zod";

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    image: z.string({
      required_error: "Image is required",
    }),
  }),
});

export const CategoryValidations = {
  createCategoryValidationSchema,
};
