import { cookies } from "next/headers";

export async function getSupplierSettings() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("supplier_access_token")?.value;

    const url = new URL("/supplier_settings/", process.env.CORE_API_URL);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["supplier-settings"] },
    });

    if (!rawResponse.ok) {
      throw new Error(
        `Failed to fetch settings. Status: ${rawResponse.status}`,
      );
    }

    const { supplier: settings } = await rawResponse.json();

    return settings;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
}
