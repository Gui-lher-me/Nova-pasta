"use server";
import "server-only";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const baseUrl = process.env.CORE_API_URL;

export const vendor = async (id, status) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/api/vendors/", baseUrl);
    url.pathname += `${id}/${status}/`;

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      method: "POST",
      headers,
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to change vendor status");
    }

    const res = await rawResponse.json();

    console.log({ res });
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while changing vendor status",
    };
  }

  revalidateTag("vendor");
};
