"use server";
import "server-only";

import { updateSettings } from "@/lib/api/update-settings";
import { revalidateTag } from "next/cache";
import { packagingSchema } from "../../schemas/brand";

export const packaging = async (_, formData) => {
  const data = {
    white_label: formData.has("white_label"),
    white_label_packaging: formData.has("white_label_packaging"),
    white_label_product: formData.has("white_label_product"),
    branded_invoicing: formData.has("branded_invoicing"),
    branding_on_product: formData.has("branding_on_product"),
    branding_on_packaging: formData.has("branding_on_packaging"),
    branding_on_box: formData.has("branding_on_box"),
    branding_on_anything: formData.has("branding_on_anything"),
    branding_no_promo: formData.has("branding_no_promo"),
    branding_description: formData.get("branding_description"),
  };

  const parsed = packagingSchema.safeParse(data);

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
      message: "An unexpected error occurred while updating settings",
    };
  }

  revalidateTag("supplier-settings");
  return { error: false, message: "Saved successfully" };
};
