"use server";
import "server-only";

import { catchError, withValidation } from "@/lib/utils";
import { resetSchema } from "../../schemas/reset";
import { reset as resetDb } from "../db/reset";

export const reset = withValidation(resetSchema, async (data) => {
  const [error] = await catchError(resetDb(data));

  if (error) {
    return { error: true, message: error.message };
  } else {
    return { error: false, message: "Saved successfully" };
  }
});
