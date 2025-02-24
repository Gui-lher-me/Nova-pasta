import { z } from "zod";

export const shippedSchema = z.object({
  tracking_number: z
    .string()
    .trim()
    .min(1, { message: "Please enter a valid tracking number" }),
  shipping_carrier: z
    .string()
    .trim()
    .min(1, { message: "Please enter a valid carrier" }),
});
