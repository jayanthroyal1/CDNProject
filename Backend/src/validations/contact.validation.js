import { z } from "zod";

export const createContactSchema = z.object({
  name: z.string().min(2),

  email: z.string().email(),

  subject: z.string().min(3),

  message: z.string().min(10),
});

export const updateStatusSchema = z.object({
  status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED"]),
});
