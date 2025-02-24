import { cookies } from "next/headers";

const baseUrl = process.env.CORE_API_URL;

export async function getStoreSuppliers(
  storeId,
  {
    category,
    subcategory,
    values,
    manufacturingCountry,
    supplierCountry,
    shipsTo,
    search,
    page = 1,
  },
) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("store_access_token")?.value;

    const url = new URL("/suppliers/", process.env.CORE_API_URL);

    url.searchParams.set("storeId", storeId);
    if (category) url.searchParams.set("category", category);
    if (subcategory) url.searchParams.set("subcategory", subcategory);
    if (values) url.searchParams.set("values", values);
    if (manufacturingCountry)
      url.searchParams.set("manufacturingCountry", manufacturingCountry);
    if (supplierCountry)
      url.searchParams.set("supplierCountry", supplierCountry);
    if (shipsTo) url.searchParams.set("shipsTo", shipsTo);
    if (search) url.searchParams.set("search", search);
    url.searchParams.set("page", page);

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      headers,
      next: { tags: ["store-suppliers"] },
    });

    if (!rawResponse.ok) {
      const errorResponse = await rawResponse.json();
      const errorMessage =
        errorResponse?.detail ||
        errorResponse?.error ||
        "Failed to fetch suppliers. Please try again.";
      throw new Error(errorMessage);
    }

    const data = await rawResponse.json();
    // console.log({ data });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || "An unexpected error occurred while fetching suppliers.",
    );
  }
}

export async function markAsUnfavorite({ supplier }) {
  try {
    const url = new URL(
      "/api/favourite-suppliers/", // needs a trailing slash
      baseUrl,
    );
    url.pathname += `${supplier}/`;

    // Get cookie
    const token = cookies().get("store_access_token")?.value;

    const headers = new Headers();
    headers.set("Authorization", `Token ${token}`);

    const rawResponse = await fetch(url, {
      method: "DELETE",
      headers,
    });

    if (!rawResponse.ok) {
      const errorResponse = await rawResponse.json();
      const errorMessage =
        errorResponse?.detail ||
        errorResponse?.error ||
        "Failed to mark supplier as unfavorite. Please try again.";
      throw new Error(errorMessage);
    }

    const data = await rawResponse.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message ||
        "An unexpected error occurred while marking supplier as unfavorite.",
    );
  }
}

export async function markAsFavorite({ store, supplier }) {
  try {
    const url = new URL(
      "/api/favourite-suppliers/", // needs a trailing slash
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
      body: JSON.stringify({ store, supplier }),
    });

    if (!rawResponse.ok) {
      const errorResponse = await rawResponse.json();
      const errorMessage =
        errorResponse?.detail ||
        errorResponse?.error ||
        "Failed to mark supplier as favorite. Please try again.";
      throw new Error(errorMessage);
    }

    const data = await rawResponse.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message ||
        "An unexpected error occurred while marking supplier as favorite.",
    );
  }
}
