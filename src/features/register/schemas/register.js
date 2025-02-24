import { z } from "zod";

export const associateSignupSchema = z
  .object({
    email: z.string().trim().email("Please enter a valid email"),
    password: z.string().trim().min(6, "Enter at least 6 characters"),
    confirm: z.string().trim(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
