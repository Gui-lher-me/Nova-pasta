"use server";
import "server-only";

import { updateSettings } from "@/lib/api/update-settings";
import { notificationSchema } from "../../schemas/notifications";

export const notifications = async (_, formData) => {
  const data = Object.fromEntries(formData);
  const parsed = notificationSchema.safeParse(data);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      errors: fieldErrors,
    };
  }

  const {
    notification_frequency: inbox_notification_frequency,
    notification_email,
  } = parsed.data;

  try {
    await updateSettings({ inbox_notification_frequency, notification_email });

    return { error: false, message: "Saved successfully" };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while updating settings",
    };
  }
};
