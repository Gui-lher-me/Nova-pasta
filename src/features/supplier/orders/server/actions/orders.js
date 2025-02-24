"use server";
import "server-only";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { shippedSchema } from "../../schemas/orders";

const baseUrl = process.env.CORE_API_URL;

export const shipped = async (orderId, _, formData) => {
  const data = Object.fromEntries(formData);
  const parsed = shippedSchema.safeParse(data);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      errors: fieldErrors,
    };
  }

  const { shipping_carrier, tracking_number } = parsed.data;

  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/mark_order_as_shipped/", baseUrl);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);
    headers.set("Content-Type", "application/json");

    const rawResponse = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        order_id: orderId,
        shipping_carrier,
        tracking_number,
      }),
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to mark order as shipped");
    }

    const res = await rawResponse.json();

    console.log({ res });
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while marking order as shipped",
    };
  }

  revalidateTag("supplier-order");
  redirect(`/orders/${orderId}/edit`);
};
