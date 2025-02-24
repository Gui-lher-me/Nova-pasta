import { cookies } from "next/headers";

const baseUrl = process.env.CORE_API_URL;

export async function createStoreReview({ rating, review }) {
  try {
    const url = new URL(
      "/store_app_review/", // needs a trailing slash
      baseUrl,
    );

    // Get cookie
    const token = cookies().get("store_access_token")?.value;

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);
    headers.set("Content-Type", "application/json");

    const rawResponse = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ rating, review }),
    });

    if (!rawResponse.ok) {
      const errorResponse = await rawResponse.json();
      const errorMessage =
        errorResponse?.detail ||
        errorResponse?.error ||
        "Failed to save the review. Please try again.";
      throw new Error(errorMessage);
    }

    const data = await rawResponse.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || "An unexpected error occurred while saving the rating.",
    );
  }
}
