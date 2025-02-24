import { cookies } from "next/headers";

export async function getStoreSettings() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("store_access_token")?.value;

    const url = new URL("/store_settings/", process.env.CORE_API_URL);
    url.searchParams.set("path", "/dashboard");
    url.searchParams.set("subdomain", "app");

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["store-settings"] },
    });

    if (!rawResponse.ok) {
      throw new Error(
        `Failed to fetch settings. Status: ${rawResponse.status}`,
      );
    }

    const { settings } = await rawResponse.json();

    return settings;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
}
