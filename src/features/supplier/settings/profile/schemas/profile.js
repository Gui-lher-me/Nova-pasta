import { urlRegex } from "@/constants";
import { z } from "zod";

export const supplierProfileSchema = z
  .object({
    website: z
      .string()
      .trim()
      .regex(urlRegex, "Please enter a valid url")
      .or(z.literal("")),
    description: z
      .string()
      .trim()
      .min(10, { message: "Please enter at least 10 characters" }),
    short_description: z
      .string()
      .trim()
      .min(6, { message: "Please enter at least 6 characters" })
      .max(36, { message: "Please enter at most 36 characters" }),
    return_policy: z
      .string()
      .trim()
      .min(10, { message: "Please enter at least 10 characters" }),
    auto_import: z.boolean(),
    sync_inventory: z.boolean(),
    sync_pricing: z.boolean(),
    discount: z.number().int(),
    use_compare_at_price: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.sync_pricing) {
        return data.discount >= 30;
      }
      return true; // If sync_pricing is false, no additional validation is required
    },
    {
      path: ["discount"], // Points to the field causing the error
      message:
        "Reseller margin must be 30% or higher when 'sync Shopify pricing' is active",
    },
  );
