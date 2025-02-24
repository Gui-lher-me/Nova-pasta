import { countryOptions, MANUFACTURING_TIME_OPTIONS } from "@/constants";
import { z } from "zod";

// SHIPPING SCHEMA -----------------------------------------
export const shippingSchema = z
  .object({
    id: z.number().nullish(),
    to_country: z.enum(
      countryOptions.map((country) => country.value),
      { message: "Please select a valid country" },
    ),
    from_country: z.enum(countryOptions.map((country) => country.value)),
    price: z.number().min(1, { message: "Price cannot be lower than 1" }),
    additional_item_shipping_rate: z.number({
      message: "A valid number is required",
    }),
    carrier: z
      .string()
      .trim()
      .min(1, { message: "Please enter a valid carrier" }),
    delivery_days_min: z
      .number()
      .int()
      .min(1, { message: "The minimum delivery time cannot be lower than 1" }),
    delivery_days_max: z
      .number()
      .int()
      .min(1, { message: "The maximum delivery time cannot be lower than 1" }),
    excluded_regions: z.string().nullish(),
    deactivated: z.boolean(),
    product: z.number().nullish(),
  })
  .superRefine((data, ctx) => {
    if (data.delivery_days_min !== 0) {
      // Validate that delivery_days_min is not greater than delivery_days_max
      if (data.delivery_days_min >= data.delivery_days_max) {
        ctx.addIssue({
          path: ["delivery_days_min"], // Error shown on delivery_days_min
          message:
            "The minimum delivery time cannot be greater than or equal to the maximum time",
        });
      }
    }

    // Validate price based on to_country
    if (data.price > 30) {
      ctx.addIssue({
        path: ["price"],
        message:
          "Shipping rates higher than $30 make dropshipping tough in general. Please contact support@dropcommerce.com to discuss your shipping settings.",
      });
    } else if (data.to_country === "CA" && data.price > 20) {
      ctx.addIssue({
        path: ["price"],
        message:
          "Canadian shipping rates higher than $20 make dropshipping tough. Please contact support@dropcommerce.com to discuss your shipping settings.",
      });
    } else if (data.to_country === "US" && data.price > 15) {
      ctx.addIssue({
        path: ["price"],
        message:
          "US shipping rates higher than $15 make dropshipping tough. Please contact support@dropcommerce.com to discuss your shipping settings.",
      });
    }
  });

// MANUFACTURING SCHEMA -----------------------------------------
export const manufacturingSchema = z.object({
  manufacturing_time: z.enum(
    MANUFACTURING_TIME_OPTIONS.map((freq) => freq.value),
    { message: "Please select a valid option" },
  ),
});
