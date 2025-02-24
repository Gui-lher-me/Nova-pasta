import { cookies } from "next/headers";

const baseUrl = process.env.CORE_API_URL;

export const deleteProducts = async (products) => {
  const url = new URL(
    "/embedded/imports/delete/", // needs a trailing slash
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
    body: JSON.stringify(products),
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

export const pushProducts = async (products) => {
  const url = new URL(
    "/embedded/imports/push/", // needs a trailing slash
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
    body: JSON.stringify(products),
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

// eslint-disable-next-line no-unused-vars
export const saveProduct = async (product) =>
  new Promise((resolve, reject) =>
    setTimeout(() => reject({ message: "Something went wrong!" }), 5000),
  );
