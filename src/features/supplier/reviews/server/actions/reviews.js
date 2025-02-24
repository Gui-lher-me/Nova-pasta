"use server";
import "server-only";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { appealSchema } from "../../schemas/reviews";

const baseUrl = process.env.CORE_API_URL;

export const appeal = async (supplierId, _, formData) => {
  const data = Object.fromEntries(formData);
  const parsed = appealSchema.safeParse(data);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      errors: fieldErrors,
    };
  }

  const { reason } = parsed.data;

  try {
    const url = new URL(
      `/api/supplier-reviews/${supplierId}/appeal/`, // needs a trailing slash
      baseUrl,
    );

    // Get cookie
    const token = cookies().get("supplier_access_token")?.value;

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);
    headers.set("Content-Type", "application/json");

    const rawResponse = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ message: reason }),
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to appeal review");
    }

    const res = await rawResponse.json();

    console.log({ res });
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while appealing review",
    };
  }

  revalidateTag("supplier-reviews");
  redirect("/reviews");
};
