import { z } from "zod";

export const markAsUnfavoriteSchema = z.object({
  supplier: z.coerce.number(),
});

export const markAsFavoriteSchema = z.object({
  store: z.coerce.number(),
  supplier: markAsUnfavoriteSchema.shape.supplier, // Reuse the supplier property
});
