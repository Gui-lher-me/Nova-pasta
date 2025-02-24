"use server";
import "server-only";

import { updateSettings } from "@/lib/api/update-settings";
import { revalidateTag } from "next/cache";

export const values = async (_, formData) => {
  const data = {
    made_in_canada: formData.has("made_in_canada"),
    made_in_us: formData.has("made_in_us"),
    fair_trade: formData.has("fair_trade"),
    organic: formData.has("organic"),
    handmade: formData.has("handmade"),
    kosher: formData.has("kosher"),
    non_gmo: formData.has("non_gmo"),
    women_owned: formData.has("women_owned"),
    vegan: formData.has("vegan"),
    eco_friendly: formData.has("eco_friendly"),
    social_good: formData.has("social_good"),
    small_batch: formData.has("small_batch"),
  };

  try {
    await updateSettings(data);
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while updating values",
    };
  }

  revalidateTag("supplier-settings");
  return { error: false, message: "Saved successfully" };
};
