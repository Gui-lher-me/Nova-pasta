import { NOTIFICATION_FREQUENCIES } from "@/constants";
import { z } from "zod";

export const notificationSchema = z.object({
  notification_frequency: z.enum(
    NOTIFICATION_FREQUENCIES.map((freq) => freq.value),
    { message: "Please select a valid notification frequency" },
  ),
  notification_email: z.string().trim().email("Please enter a valid email"),
});
