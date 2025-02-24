import { z } from "zod";

export const messageSchema = z.object({
  message: z.string().trim().min(1, "Please enter a valid message"),
});
