import { cookies } from "next/headers";

const baseUrl = process.env.CORE_API_URL;

export async function updateSupplier(id, action, value) {
  try {
    const url = new URL(
      "/supplier_management/", // needs a trailing slash
      baseUrl,
    );

    // Get cookie
    const token = cookies().get("admin_access_token")?.value;

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);
    headers.set("Content-Type", "application/json");

    const rawResponse = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ supplier: id, action, value }),
    });

    if (!rawResponse.ok) {
      throw new Error("Supplier management action failed.");
    }

    const response = await rawResponse.json();

    console.log({ response });
  } catch (error) {
    console.error("Login error:", error);
    return {
      error: true,
      message: "An unexpected error occurred while deactivating user.",
    };
  }
}
