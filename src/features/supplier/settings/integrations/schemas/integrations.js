import { z } from "zod";

export const paypalSchema = z.object({
  merchantId: z
    .string()
    .trim()
    .min(1, "Enter a valid ID")
    .refine((val) => val === "" || /^[^@]+$/.test(val), {
      message: "The merchant ID must not contain '@'",
    }),
});
