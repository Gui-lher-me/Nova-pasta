import { z } from "zod";

const variantSchema = z.object({
  name: z.string().min(1, "Enter a valid name"),
  custom_price: z.number().min(0),
  active: z.boolean(),
  compare_at_price: z.number().nullable(),
  shipping_cost: z.number().min(0),
  stock: z.number().min(0),
  cost: z.number().min(0),
});

export const productSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  variants: z.array(variantSchema),
  description: z.string(),
  tags: z.string().optional(),
  type: z.string().optional(),
  collection: z.string().optional(),
});
