import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(3),

  title: z.string().min(2),

  summary: z.string().min(10),

  email: z.string().email(),

  phone: z.string().optional(),

  location: z.string().optional(),

  profileImage: z.string().optional(),

  resumeUrl: z.string().optional(),
});
