const baseUrl = process.env.CORE_API_URL;

export const signup = async (data) => {
  const url = new URL(
    "/supplier_registration/", // needs a trailing slash
    baseUrl,
  );

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const rawResponse = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!rawResponse.ok) {
    const response = await rawResponse.json();

    if (response.error) {
      throw new Error(response.error);
    }

    throw new Error("Signup request failed.");
  }

  return await rawResponse.json();
};
