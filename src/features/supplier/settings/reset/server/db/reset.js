import { cookies } from "next/headers";

const baseUrl = process.env.CORE_API_URL;

export async function reset({ password }) {
  try {
    const url = new URL("/password_reset/", baseUrl);

    const token = cookies().get("supplier_access_token")?.value;

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);
    headers.set("Content-Type", "application/json");

    const rawResponse = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ password }),
    });

    if (!rawResponse.ok) {
      const errorResponse = await rawResponse.json();
      const errorMessage =
        errorResponse?.detail ||
        errorResponse?.error ||
        "Failed to reset password. Please try again.";
      throw new Error(errorMessage);
    }

    const data = await rawResponse.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || "An unexpected error occurred while resetting password.",
    );
  }
}
