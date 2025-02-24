import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = request.nextUrl;

  const shop = searchParams.get("shop");
  const code = searchParams.get("code");
  const hmac = searchParams.get("hmac");
  const host = searchParams.get("host");
  const state = searchParams.get("state");
  const timestamp = searchParams.get("timestamp");

  const cookieStore = cookies();
  const nonce = cookieStore.get("nonce")?.value;

  // Step 1: Verify required parameters
  if (!shop || !code || !hmac || !host || !state || !timestamp) {
    return NextResponse.json(
      { error: "Missing required query parameters" },
      { status: 400 },
    );
  }

  // Step 2: Validate the state against the nonce cookie
  if (!nonce || nonce !== state) {
    return NextResponse.json(
      {
        error: "State mismatch or missing nonce",
      },
      { status: 401 },
    );
  }

  // Step 3: Exchange the authorization code for an access token
  try {
    const url = new URL("/supplier_shopify_auth/", process.env.CORE_API_URL);

    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

    const rawResponse = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        shop,
        code,
        hmac,
        host,
        state,
        timestamp,
        app_name: "SUPPLIERS",
      }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    if (!rawResponse.ok) {
      // Handle other non-200 responses

      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 400 },
      );
    }

    const response = await rawResponse.json();

    if (response.error) {
      if (response.error === "Bad hmac") {
        return NextResponse.json(
          { error: "HMAC validation failed" },
          { status: 401 },
        );
      } else {
        return NextResponse.json(
          { error: "Unknown error from authentication server" },
          { status: 400 },
        );
      }
    } else if (response.token) {
      const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
      cookieStore.set({
        name: "supplier_access_token",
        value: response.token,
        httpOnly: true, // Keeps the cookie inaccessible to client-side JavaScript
        secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
        path: "/", // The cookie is available throughout the website
        expires: new Date(Date.now() + oneDay), // Expires in one day
      });
    }
  } catch (error) {
    console.error("Error during token exchange:", error);
    return NextResponse.json(
      { error: "Failed to exchange token" },
      { status: 500 },
    );
  }

  redirect("/products");
}
