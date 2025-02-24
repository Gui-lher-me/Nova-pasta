import { z } from "zod";

export const titleSchema = z.object({
  title: z.string().trim().min(2, "Please enter a valid title"),
});

export const variantSchema = z
  .object({
    id: z.number().int().optional(),
    name: z.string().trim().min(1, "Name is required"),
    sku: z.string().trim().min(1, "Sku is required"),
    quantity: z.coerce.number(),
    price: z.coerce.number().min(1, {
      message: "Reseller price must be greater than or equal to 1",
    }),
    retailPrice: z.coerce.number().min(1, {
      message: "Retail price must be greater than or equal to 1",
    }),
    active: z.boolean().default(true),
  })
  .refine(
    (data) => {
      const price = parseFloat(data.price);
      const retailPrice = parseFloat(data.retailPrice);
      return price <= retailPrice * 0.7;
    },
    {
      message: "Reseller price must be at least 30% off retail price",
      path: ["price"],
    },
  )
  .refine((data) => (data.active ? data.quantity > 0 : true), {
    message: "Quantity must be greater than 0 if the variant is active",
    path: ["quantity"],
  });

export const variantsSchema = z.object({
  variants: z.array(variantSchema),
});

export const productSchema = z
  .object({
    id: z.number().int(),
    title: z.string().trim().min(1, "Please enter a valid title"),
    description: z.string().trim().optional(),
    sku: z.string().trim().min(1, "Please enter a valid sku"),
    featured: z.boolean(),
    track_inventory: z.boolean(),
    track_pricing: z.boolean(),
    override_discount_percent: z.boolean(),
    discount_percent: z.number().int(),
  })
  .refine(
    (data) => {
      if (data.override_discount_percent) {
        return data.discount_percent >= 30;
      }
      return true; // If override_discount_percent is false, no additional validation is required
    },
    {
      path: ["discount_percent"], // Points to the field causing the error
      message:
        "Reseller margin must be 30% or higher when 'override reseller margin' is active",
    },
  );
