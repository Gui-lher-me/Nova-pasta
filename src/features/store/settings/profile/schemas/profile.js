import { z } from "zod";

export const storeProfileSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  owner_email: z.string().trim().email("Please enter a valid email"),
});

export const resetSchema = z
  .object({
    password: z.string().trim().min(6, "Enter at least 6 characters"),
    confirm: z.string().trim(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
