"use server";
import "server-only";

import { catchError, withValidation } from "@/lib/utils";
import { resetSchema, storeProfileSchema } from "../../schemas/profile";
import { profile as profileDb, reset as resetDb } from "../db/profile";

export const profile = withValidation(storeProfileSchema, async (data) => {
  const [error] = await catchError(profileDb(data));

  if (error) {
    return { error: true, message: error.message };
  } else {
    return { error: false, message: "Saved successfully" };
  }
});

export const reset = withValidation(resetSchema, async (data) => {
  const [error] = await catchError(resetDb(data));

  if (error) {
    return { error: true, message: error.message };
  } else {
    return { error: false, message: "Saved successfully" };
  }
});
