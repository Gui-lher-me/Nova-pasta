"use server";
import "server-only";

import { revalidateTag } from "next/cache";
import { updatePrebuilt } from "../db/prebuilts";

export const managePrebuilt = async (id, action, value = null) => {
  await updatePrebuilt(id, action, value);
  revalidateTag("prebuilts");
  revalidateTag("prebuilt");
  return {
    error: false,
    message: "Your request has been successfully processed",
  };
};
