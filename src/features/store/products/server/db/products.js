import { cookies } from "next/headers";

const baseUrl = process.env.CORE_API_URL;

export async function importProduct({ product_id }) {
  try {
    const url = new URL(
      "/import_list/", // needs a trailing slash
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
      body: JSON.stringify({ product_id }),
    });

    if (!rawResponse.ok) {
      const errorResponse = await rawResponse.json();
      const errorMessage =
        errorResponse?.detail ||
        errorResponse?.error ||
        "Failed to import product. Please try again.";
      throw new Error(errorMessage);
    }

    const data = await rawResponse.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || "An unexpected error occurred while importing product.",
    );
  }
}

export async function getStoreProducts(
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

    const url = new URL("/products/", process.env.CORE_API_URL);

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
      next: { tags: ["store-products"] },
    });

    if (!rawResponse.ok) {
      const errorResponse = await rawResponse.json();
      const errorMessage =
        errorResponse?.detail ||
        errorResponse?.error ||
        "Failed to fetch products. Please try again.";
      throw new Error(errorMessage);
    }

    const data = await rawResponse.json();
    // console.log({ data });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.message || "An unexpected error occurred while fetching products.",
    );
  }
}
