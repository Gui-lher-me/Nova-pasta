"use server";
import "server-only";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { referralSchema } from "../../schemas/referrals";

const baseUrl = process.env.CORE_API_URL;

export const referral = async (_, formData) => {
  const data = Object.fromEntries(formData);

  const parsed = referralSchema.safeParse(data);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      errors: fieldErrors,
    };
  }

  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/referrals/", baseUrl);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);
    headers.set("Content-Type", "application/json");

    const rawResponse = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(parsed.data),
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to submit referral"); // probably a server error
    }

    const res = await rawResponse.json();

    if (res.error) {
      return { error: true, message: res.error };
    }
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while submitting referral",
    };
  }

  revalidateTag("supplier-referrals");
  redirect("/settings/referrals");
};
