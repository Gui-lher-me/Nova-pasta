import { COUNTRIES, phoneRegex, PLATFORMS, urlRegex } from "@/constants";
import { z } from "zod";

export const supplierSignupSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  website: z.string().trim().regex(urlRegex, "Please enter a valid url"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid phone number"),
  email: z.string().trim().email("Invalid email address"),
  city: z.string().trim().min(1, "City is required"),
  country: z.enum(
    COUNTRIES.map((country) => country.value),
    { message: "Please select a valid country" },
  ),
  shipCountry: z.enum(
    COUNTRIES.map((country) => country.value),
    { message: "Please select a valid country" },
  ),
  platform: z.enum(
    PLATFORMS.map((platform) => platform.value),
    { message: "Invalid platform" },
  ),
  discount: z.number().min(35, "Discount must be greater than or equal to 35"),
  supplierAgreementAccepted: z.boolean().default(false),
});
