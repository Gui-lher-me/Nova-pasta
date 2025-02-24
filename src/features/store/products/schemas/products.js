import { z } from "zod";

export const importProductSchema = z.object({
  product_id: z.coerce.number(),
});
