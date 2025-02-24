"use server";
import "server-only";

import { updateSettings } from "@/lib/api/update-settings";
import { revalidateTag } from "next/cache";

export const agreement = async (_, formData) => {
  const data = {
    shipping: formData.has("shipping"),
    inventory: formData.has("inventory"),
    pricing: formData.has("pricing"),
    communication: formData.has("communication"),
  };

  if (
    !data.shipping ||
    !data.inventory ||
    !data.pricing ||
    !data.communication
  ) {
    return {
      error: true,
      message: "Please agree to all DropCommerce terms to proceed",
    };
  }

  try {
    await updateSettings({ supplier_agreement: true });
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while saving agreement",
    };
  }

  revalidateTag("supplier-settings");
  return { error: false, message: "Saved successfully" };
};
