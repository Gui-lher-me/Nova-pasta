const baseUrl = process.env.CORE_API_URL;

export const login = async ({ email, password }) => {
  const url = new URL(
    "/reseller/login/", // needs a trailing slash
    baseUrl,
  );

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const rawResponse = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      username: email,
      password: password,
    }),
  });

  if (!rawResponse.ok) {
    throw new Error("Login request failed.");
  }

  return await rawResponse.json();
};

export const signup = async (data) => {
  const url = new URL(
    "/signup/", // needs a trailing slash
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
