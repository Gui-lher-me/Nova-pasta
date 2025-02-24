"use server";
import "server-only";

import { updateSettings } from "@/lib/api/update-settings";
import { uploadImage as uploadImageDb } from "@/lib/cloudinary";
import { isImageFile } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import { supplierProfileSchema } from "../../schemas/profile";

// UPDATE PROFILE ----------------------------------------------------------
export const profile = async (_, formData) => {
  const data = {
    website: formData.get("website"),
    description: formData.get("description"),
    short_description: formData.get("short_description"),
    return_policy: formData.get("return_policy"),
    auto_import: formData.has("auto_import"),
    sync_inventory: formData.has("sync_inventory"),
    sync_pricing: formData.has("sync_pricing"),
    discount: Number(formData.get("discount")),
    use_compare_at_price: formData.has("use_compare_at_price"),
  };

  const parsed = supplierProfileSchema.safeParse(data);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      errors: fieldErrors,
    };
  }

  // save in db
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

// UPDATE LOGO ----------------------------------------------------------
export const uploadLogo = async (formData) => {
  const file = formData.get("logo");

  if (!isImageFile(file)) {
    return { error: true, message: "Please enter a valid image file" };
  }

  let logo = null;

  // upload to cloudinary
  try {
    const url = await uploadImageDb(file);
    logo = url;
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message:
        error.message ?? "An unexpected error occurred while uploading image",
    };
  }

  // save in db
  try {
    await updateSettings({ logo });
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while updating logo",
    };
  }

  revalidateTag("supplier-settings");
  return { error: false, message: "Logo has been changed successfully" };
};
