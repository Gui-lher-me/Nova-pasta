"use server";
import "server-only";

import { catchError, withValidation } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import {
  markAsFavoriteSchema,
  markAsUnfavoriteSchema,
} from "../../schemas/suppliers";
import {
  markAsFavorite as markAsFavoriteDb,
  markAsUnfavorite as markAsUnfavoriteDb,
} from "../db/suppliers";

export const markAsUnfavorite = withValidation(
  markAsUnfavoriteSchema,
  async (data) => {
    const [error] = await catchError(markAsUnfavoriteDb(data));

    if (error) {
      return { error: true, message: error.message };
    } else {
      // revalidateTag("store-suppliers");
      revalidateTag("store-dashboard");
      return { error: false, message: "Removed from favorites successfully" };
    }
  },
);

export const markAsFavorite = withValidation(
  markAsFavoriteSchema,
  async (data) => {
    const [error] = await catchError(markAsFavoriteDb(data));

    if (error) {
      return { error: true, message: error.message };
    } else {
      // revalidateTag("store-suppliers");
      revalidateTag("store-dashboard");
      return { error: false, message: "Added to favorites successfully" };
    }
  },
);
