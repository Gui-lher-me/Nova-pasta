import { cookies } from "next/headers";

const baseUrl = process.env.CORE_API_URL;

export async function updatePrebuilt(id, action, value) {
  try {
    const url = new URL(`/api/admin/prebuilts/${id}/manage/`, baseUrl);
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    const token = cookies().get("admin_access_token")?.value;
    headers.set("Authorization", `Token ${token}`);
    // Request external data
    const rawResponse = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ prebuilt: id, action, value }),
    });
    const response = await rawResponse.json();
    // Handle error response
    if (!rawResponse.ok) {
      if (rawResponse.status === 400 && response.error)
        return { error: true, message: response.error };
      throw new Error("Prebuilt action failed.");
    }
    // Handle success response
  } catch (error) {
    return {
      error: true,
      message: "An unexpected error occurred while deactivating user.",
    };
  }
}
