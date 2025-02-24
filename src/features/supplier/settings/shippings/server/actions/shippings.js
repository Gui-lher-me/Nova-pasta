"use server";
import "server-only";

import { codeMap, getCodeFromCountry } from "@/constants";
import { updateSettings } from "@/lib/api/update-settings";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { manufacturingSchema, shippingSchema } from "../../schemas/shippings";

const baseUrl = process.env.CORE_API_URL;

export const shipping = async (
  supplierCountry,
  id,
  productId,
  isAttachedToProduct,
  _,
  formData,
) => {
  const data = {
    to_country: formData.get("to_country"),
    from_country: getCodeFromCountry(supplierCountry) ?? "US",
    price: +formData.get("price"),
    additional_item_shipping_rate: +formData.get(
      "additional_item_shipping_rate",
    ),
    carrier: formData.get("carrier"),
    delivery_days_min: +formData.get("delivery_days_min"),
    delivery_days_max: +formData.get("delivery_days_max"),
    deactivated: formData.has("deactivated"),
  };

  if (id) data.id = id;
  if (productId) data.product = +productId;

  let redirectUrl = "/settings/shippings";
  if (isAttachedToProduct) {
    redirectUrl += "/?product_id=" + productId;
  }

  if (id) data.id = id;

  // Checking if any exclusion flag is true, then add to excluded_regions
  const excludedRegions = Object.keys(codeMap)
    .filter((key) => formData.has(key))
    .map((key) => codeMap[key]);

  // Add excluded regions to data if any are true
  if (excludedRegions.length > 0) {
    data.excluded_regions = excludedRegions.join(",");
  } else {
    data.excluded_regions = null;
  }

  const parsed = shippingSchema.safeParse(data);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      errors: fieldErrors,
    };
  }

  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/api/shipping-options/", baseUrl);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);
    headers.set("Content-Type", "application/json");

    const rawResponse = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(parsed.data),
    });

    const res = await rawResponse.json();

    if (!rawResponse.ok) {
      if (res.error) return { error: true, message: res.error };

      const [nonFieldError] = res.non_field_errors;
      if (nonFieldError) {
        return {
          error: true,
          message: nonFieldError ?? "Failed to create shipping rate",
        };
      }

      throw new Error("Failed to create shipping rate");
    }

    console.log({ res });
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while creating shipping rate",
    };
  }

  revalidateTag("supplier-settings");
  redirect(redirectUrl);
};

export const manufacturing = async (_, formData) => {
  const data = Object.fromEntries(formData);

  const parsed = manufacturingSchema.safeParse(data);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      errors: fieldErrors,
    };
  }

  try {
    await updateSettings(parsed.data);
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while saving manufacturing time",
    };
  }

  return { error: false, message: "Saved successfully" };
};
