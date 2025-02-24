import { COOKIE_NAMES } from "@/constants";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const magic = searchParams.get("magic");
  const type = searchParams.get("type");
  const store = searchParams.get("store");

  // Validate `magic` and `type` parameters
  if (!magic) {
    return NextResponse.json(
      { error: "Missing magic parameter" },
      { status: 400 },
    );
  }

  if (!type || !["store", "supplier_settings"].includes(type)) {
    return NextResponse.json(
      { error: "Invalid or missing type parameter" },
      { status: 400 },
    );
  }

  const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

  // Determine redirect path based on type
  const host = req.headers.get("host");
  const protocol = req.headers.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;
  const redirectPath =
    type === "store" ? `/store/${store}/dashboard` : "/products";
  const redirectUrl = new URL(redirectPath, baseUrl);

  const response = NextResponse.redirect(redirectUrl.toString());

  // Delete all access token cookies
  COOKIE_NAMES.forEach((cookie) => response.cookies.delete(cookie));

  // Determine cookie name based on type
  const cookieName =
    type === "supplier_settings"
      ? "supplier_access_token"
      : "store_access_token";

  // Set the magic parameter as a cookie with the determined name
  response.cookies.set({
    name: cookieName,
    value: magic,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(Date.now() + oneDay),
  });

  return response;
}
