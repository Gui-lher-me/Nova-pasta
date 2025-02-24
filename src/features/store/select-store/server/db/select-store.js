import { cookies } from "next/headers";

export async function getAccountInfo() {
  const cookieStore = cookies();
  const token = cookieStore.get("store_access_token")?.value;

  const url = new URL("/reseller/account/", process.env.CORE_API_URL);

  const headers = new Headers();
  headers.set("Authorization", `Token ${token}`);

  const rawResponse = await fetch(url, {
    headers,
    next: { tags: ["store-account"] },
  });

  if (!rawResponse.ok) {
    const errorResponse = await rawResponse.json();
    const errorMessage =
      errorResponse?.detail ||
      errorResponse?.error ||
      "Failed to fetch account info. Please try again.";
    throw new Error(errorMessage);
  }

  const data = await rawResponse.json();

  return data;
}
