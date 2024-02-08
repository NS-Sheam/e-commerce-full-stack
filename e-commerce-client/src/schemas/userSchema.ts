// {
//     "userName": "customer",
//     "name": {
//       "firstName": "Customer",
//       "middleName": "Nazmus",
//       "lastName": "Sakib"
//     },
//     "gender": "male",
//     "email": "customer@example.com",
//     "mobileNo": "012323232323",
//     "image": "https://example.com/profile.jpg"
//   }
// }

import { z } from "zod";

export const userRegistrationFormSchema = z.object({
  userName: z.string(),
  name: z.object({
    firstName: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
  }),
  image: z.string().url().optional(),
  gender: z.enum(["male", "female", "other"]).refine(
    (value) => {
      return ["male", "female", "other"].includes(value);
    },
    {
      message: "Gender must be either 'male', 'female', or 'other'",
    }
  ),
  email: z.string().email(),
  mobileNo: z.string().length(11),
  password: z
    .string()
    .min(6)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?`\-=[\]\\;',./])(?!.*\s).{6,}$/),
});
