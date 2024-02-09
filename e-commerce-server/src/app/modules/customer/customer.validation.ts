import z from "zod";

const nameValidationSchema = z.object({
  firstName: z.string({
    required_error: "First name is required",
  }),
  middleName: z.string().optional(),
  lastName: z.string({
    required_error: "Last name is required",
  }),
});

const createCustomerValidationSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),
    customer: z.object({
      userName: z.string({
        required_error: "Username is required",
      }),
      name: nameValidationSchema,
      gender: z.enum(["male", "female", "other"]),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email(),
      mobileNo: z.string({
        required_error: "Mobile number is required",
      }),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

const updateNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateCustomerValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    customer: z.object({
      name: updateNameValidationSchema.optional(),
      email: z.string().email().optional(),
      mobileNo: z.string().optional(),
      image: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const CustomerValidations = {
  createCustomerValidationSchema,
  updateCustomerValidationSchema,
};
