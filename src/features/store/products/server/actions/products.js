"use server";
import "server-only";

import { catchError, withValidation } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import { importProductSchema } from "../../schemas/products";
import { importProduct as importProductDb } from "../db/products";

export const importProduct = withValidation(
  importProductSchema,
  async (data) => {
    const [error] = await catchError(importProductDb(data));

    if (error) {
      return { error: true, message: error.message };
    } else {
      // revalidateTag("store-products");
      revalidateTag("store-dashboard");
      return { error: false, message: "Added to import list successfully" };
    }
  },
);
