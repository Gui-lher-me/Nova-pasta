import { z } from "zod";

export const appealSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(6, "Enter at least 6 characters")
    .max(256, "Enter at most 256 characters"),
});
