import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  // .regex(
  //       /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
  //       "Password must contain uppercase, lowercase and number"
  //     ),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
