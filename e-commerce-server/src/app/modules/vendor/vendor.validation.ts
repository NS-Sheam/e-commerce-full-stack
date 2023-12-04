import { z } from "zod";

const nameValidationSchema = z.object({
  firstName: z.string({
    required_error: "First name is required",
  }),
  middleName: z.string().optional(),
  lastName: z.string({
    required_error: "Last name is required",
  }),
});

const createVendorValidationSchema = z.object({
  body: z.object({
    userName: z.string(),
    password: z.string(),
    vendor: z.object({
      name: nameValidationSchema,
      email: z
        .string({
          required_error: "Email is required",
        })
        .email(),
      mobileNo: z.string({
        required_error: "Mobile number is required",
      }),
      image: z.string().optional(),
      orderHistory: z.array(z.string()).optional(),
      review: z.array(z.string()).optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

const updateNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateVendorValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    vendor: z.object({
      name: updateNameValidationSchema.optional(),
      email: z.string().email().optional(),
      mobileNo: z.string().optional(),
      image: z.string().optional(),
      orderHistory: z.array(z.string()).optional(),
      review: z.array(z.string()).optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const VendorValidations = {
  createVendorValidationSchema,
  updateVendorValidationSchema,
};
