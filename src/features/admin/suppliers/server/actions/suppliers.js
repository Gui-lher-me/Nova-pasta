"use server";
import "server-only";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { updateSupplier } from "../db/suppliers";

const baseUrl = process.env.CORE_API_URL;
// TODO: fetching data in a server action
export const impersonate = async (id, type = "supplier") => {
  try {
    const url = new URL(
      "/impersonate/", // needs a trailing slash
      baseUrl,
    );
    url.searchParams.set("type", type);
    url.searchParams.set("id", id);

    // Get cookie
    const token = cookies().get("admin_access_token")?.value;

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, { headers });

    if (!rawResponse.ok) {
      throw new Error("Failed to impersonate user.");
    }

    const response = await rawResponse.json();

    return {
      error: false,
      message: "You now have a link :)",
      link: response.link,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      error: true,
      message: "An unexpected error occurred while impersonating user.",
    };
  }
};

export const manageSupplier = async (id, action, value = null) => {
  await updateSupplier(id, action, value);
  revalidateTag("suppliers");
  revalidateTag("supplier");
  return {
    error: false,
    message: "Your request has been successfully processed",
  };
};
