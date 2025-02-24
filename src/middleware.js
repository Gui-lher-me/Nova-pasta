import { NextResponse } from "next/server";

export function middleware(request) {
  const isAuthenticated = true;

  // If the user is authenticated, continue as normal
  if (isAuthenticated) {
    return NextResponse.next();
  }

  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL("/auth/?mode=login", request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icon.png (png file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png).*)",
  ],
};
