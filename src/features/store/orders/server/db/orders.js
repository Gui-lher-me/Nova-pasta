import { cookies } from "next/headers";

const baseUrl = process.env.CORE_API_URL;

export const exportOrders = async (orders) => {
  const url = new URL(
    "/embedded/orders/export/", // needs a trailing slash
    baseUrl,
  );

  // Get cookie
  const token = cookies().get("store_access_token")?.value;

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Content-Type", "application/json");

  const rawResponse = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ orders: orders }),
  });

  if (!rawResponse.ok) {
    let errorMessage = "Server error occurred. Please try again later.";

    // Try to parse the error response
    try {
      const errorResponse = await rawResponse.json();
      errorMessage =
        errorResponse?.detail || errorResponse?.error || errorMessage;
    } catch (jsonError) {
      // In case of a JSON parse error, we stick with the default error message
      console.error("Error parsing JSON:", jsonError);
    }

    // Throw with specific error message if available
    throw new Error(errorMessage);
  }

  const data = await rawResponse.json();
  console.log({ data });
  return data;
};
