import { z } from "zod";

export const packagingSchema = z.object({
  white_label: z.boolean().default(false),
  white_label_packaging: z.boolean().default(false),
  white_label_product: z.boolean().default(false),
  branded_invoicing: z.boolean().default(false),
  branding_on_product: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "Branding on product must be selected.",
      path: ["branding_on_product"], // Attach error to specific field
    }),
  branding_on_packaging: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "Branding on packaging must be selected.",
      path: ["branding_on_packaging"],
    }),
  branding_on_box: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "Branding on box must be selected.",
      path: ["branding_on_box"],
    }),
  branding_on_anything: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "Branding on anything must be selected.",
      path: ["branding_on_anything"],
    }),
  branding_no_promo: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "No promotional branding must be selected.",
      path: ["branding_no_promo"],
    }),
  branding_description: z
    .string()
    .trim()
    .min(10, "Enter at least 10 characters"),
});
