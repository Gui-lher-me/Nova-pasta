"use server";
import "server-only";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { messageSchema } from "../../schemas/inbox";

const baseUrl = process.env.CORE_API_URL;

export const message = async ({ receiverId, senderId, message, label }) => {
  const parsed = messageSchema.safeParse({ message });

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return { error: true, message: fieldErrors.message[0] };
  }

  const data = {
    receiver_id: receiverId,
    sender_id: senderId,
    text: parsed.data.message,
    label,
  };

  try {
    const url = new URL(
      `/messages/`, // needs a trailing slash
      baseUrl,
    );

    // Get cookie
    const token = cookies().get("supplier_access_token")?.value;

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);
    headers.set("Content-Type", "application/json");

    const rawResponse = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to send message");
    }

    const res = await rawResponse.json();

    console.log({ res });
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unexpected error occurred while sending message",
    };
  }

  revalidateTag("supplier-conversation");
};
