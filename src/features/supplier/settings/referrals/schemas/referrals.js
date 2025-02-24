import { z } from "zod";

export const referralSchema = z.object({
  sender_name: z.string().trim().min(2, "Please enter a valid name"),
  recipient_type: z.enum(["STORE", "SUPPLIER"], {
    message: "Please select a valid account type",
  }),
  recipient_name: z.string().trim().min(2, "Please enter a valid name"),
  recipient_email: z.string().trim().email("Please enter a valid email"),
});
