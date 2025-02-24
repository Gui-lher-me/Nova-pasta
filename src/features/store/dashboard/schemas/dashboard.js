import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.coerce.number().min(1).max(5).optional(),
  review: z.string().trim().or(z.literal("")),
});
