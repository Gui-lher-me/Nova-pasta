"use server";
import "server-only";

import { catchError, withValidation } from "@/lib/utils";
import { reviewSchema } from "../../schemas/dashboard";
import { createStoreReview as createStoreReviewDb } from "../db/dashboard";

export const createStoreReview = withValidation(reviewSchema, async (data) => {
  const [error] = await catchError(createStoreReviewDb(data));

  if (error) {
    return { error: true, message: error.message };
  } else {
    return { error: false, message: "Saved successfully" };
  }
});
