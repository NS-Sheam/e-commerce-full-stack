import z from "zod";

const createUserValidationSchema = z.object({
  userName: z.string({
    required_error: "Username is required",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  userType: z.enum(["customer", "vendor", "admin"]),
  isDeleted: z.boolean(),
});

export const UserValidations = {
  createUserValidationSchema,
};
