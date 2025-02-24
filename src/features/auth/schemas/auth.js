import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().trim().min(6, "Enter at least 6 characters"),
});

export const signupSchema = loginSchema;
