import { generateRandomString } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const scope = [
  "read_products",
  "read_orders",
  "write_orders",
  "read_fulfillments",
].join(",");

export function GET(request) {
  const { searchParams } = request.nextUrl;

  const shop = searchParams.get("shop");
  const code = searchParams.get("code");
  const hmac = searchParams.get("hmac");
  const host = searchParams.get("host");
  const state = searchParams.get("state");
  const timestamp = searchParams.get("timestamp");

  // Verify shop early
  if (!shop) {
    return NextResponse.json(
      { error: "Missing 'shop' query parameter" },
      { status: 400 },
    );
  }

  // Verify other parameters
  if (!hmac || !host || !timestamp) {
    return NextResponse.json(
      { error: "Missing required query parameters" },
      { status: 401 },
    );
  }

  // The user has accepted permissions, log them in
  if (code && state) {
    return redirect(`/api/shopify/auth/callback/?${searchParams.toString()}`);
  }

  // Looks like a new installation
  const randomString = generateRandomString(20);
  const redirectUri = new URL(
    "/api/shopify/auth/callback",
    process.env.NEXT_APP_URL,
  );

  const permissionUrl = new URL("/admin/oauth/authorize/", `https://${shop}`);
  permissionUrl.searchParams.set("client_id", process.env.SHOPIFY_CLIENT_ID);
  permissionUrl.searchParams.set("scope", scope);
  permissionUrl.searchParams.set("redirect_uri", redirectUri.toString());
  permissionUrl.searchParams.set("state", randomString);
  permissionUrl.searchParams.append("grant_options[]", "");

  const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
  cookies().set({
    name: "nonce",
    value: randomString,
    httpOnly: true, // Keeps the cookie inaccessible to client-side JavaScript
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    path: "/", // The cookie is available throughout the website
    expires: new Date(Date.now() + oneDay), // Expires in one day
  });

  // Redirect to the generated Shopify URL
  redirect(permissionUrl.toString());
}
