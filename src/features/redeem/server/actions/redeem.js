"use server";
import "server-only";

import { redirect } from "next/navigation";
import { rocketHubSignupSchema } from "../../schemas/redeem";

const baseUrl = process.env.CORE_API_URL;

export const redeem = async (_, formData) => {
  const data = Object.fromEntries(formData);

  const parsed = rocketHubSignupSchema.safeParse(data);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      errors: fieldErrors,
    };
  }

  const { email, password, code } = parsed.data;

  let externalLink = null;

  try {
    const url = new URL("/rockethub/", baseUrl);

    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const rawResponse = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password, code }),
    });

    const res = await rawResponse.json(); // Parse response once

    if (!rawResponse.ok) {
      if (rawResponse.status === 400 && res.error) {
        return { error: true, message: res.error };
      }

      // Handle other non-200 responses
      throw new Error("Redeem code request failed.");
    }

    if (res.link) {
      externalLink = res.link;
    }
  } catch (error) {
    // Handle any other errors
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while redeeming code",
    };
  }

  if (externalLink) {
    redirect(externalLink);
  }
};
