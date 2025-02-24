import { cookies } from "next/headers";

const baseUrl = process.env.CORE_API_URL;

export async function updateSettings(data) {
  const cookieStore = cookies();
  const token = cookieStore.get("supplier_access_token")?.value;

  const url = new URL("/supplier_settings/", baseUrl);

  const headers = new Headers();
  headers.set("Authorization", `Token ${token}`);
  headers.set("Content-Type", "application/json");

  const rawResponse = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!rawResponse.ok) {
    throw new Error("Failed to update settings");
  }

  const res = await rawResponse.json();

  console.log({ res });
}
