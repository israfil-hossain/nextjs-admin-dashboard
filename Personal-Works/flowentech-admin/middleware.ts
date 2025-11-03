import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const ispublic = path === "/";

  const token = request.cookies.get("authToken")?.value || "";

  if (ispublic && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!ispublic && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/calendar/:path*",
    "/charts/:path*",
    "/forms/:path*",
    "/profile/:path*",
    "/projects/:path*",
    "/tables/:path*",
    "/ui-elements/:path*",
  ],
};
