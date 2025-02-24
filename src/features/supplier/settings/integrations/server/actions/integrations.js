"use server";
import "server-only";

import { validateShopifyStoreURL } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { paypalSchema } from "../../schemas/integrations";

const baseUrl = process.env.CORE_API_URL;

// STRIPE ---------------------------------------------------------------------
const connect = async () => {
  const clientId = process.env.STRIPE_CLIENT_ID;
  const baseUrl = "https://connect.stripe.com";

  let url = new URL("/oauth/v2/authorize", baseUrl);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("scope", "read_write");

  url = url.toString();

  redirect(url);
};

const disconnect = async (supplierId) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/stripe_remove_card/", baseUrl);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);
    headers.set("Content-Type", "application/json");

    const rawResponse = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ supplier: supplierId }),
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to disconnect");
    }

    const res = await rawResponse.json();

    console.log({ res });
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while disconnecting",
    };
  }

  revalidateTag("supplier-settings");
  return { error: false, message: "Disconnected successfully" };
};

export const stripe = async (supplierId, mode) => {
  if (mode === "connect") {
    return connect();
  }
  return disconnect(supplierId);
};

// PAYPAL ---------------------------------------------------------------------
export const paypal = async (_, formData) => {
  const data = Object.fromEntries(formData);

  const parsed = paypalSchema.safeParse(data);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      errors: fieldErrors,
    };
  }

  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/api/payments/merchant/", baseUrl);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);
    headers.set("Content-Type", "application/json");

    const rawResponse = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ merchant_id: parsed.data.merchantId }),
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to save merchant ID");
    }

    const res = await rawResponse.json();

    console.log({ res });
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while saving merchant ID",
    };
  }

  revalidateTag("supplier-settings");
  redirect("/settings/integrations");
};

// SHOPIFY ---------------------------------------------------------------------
export const shopify = async (supplierId, _, formData) => {
  const shopifyUrl = formData.get("shopifyUrl");

  if (!validateShopifyStoreURL(shopifyUrl)) {
    return {
      errors: { shopifyUrl: ["Please enter a valid Shopify store URL"] },
    };
  }

  const data = {
    uid: shopifyUrl,
    other_platform: null,
    supplier: supplierId,
  };

  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/set_platform_uid/", baseUrl);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);
    headers.set("Content-Type", "application/json");

    const rawResponse = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to connect to Shopify store");
    }

    const res = await rawResponse.json();

    if (res.error) {
      return {
        error: true,
        message: res.error,
      };
    }

    console.log({ res });
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while connecting to Shopify store",
    };
  }

  redirect("https://apps.shopify.com/dropcommerce");
};
