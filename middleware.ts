// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const PUBLIC_ROUTES = ["/", "/login", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    console.log("No token, redirecting...");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Don't verify token here — just pass through
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/home"],
};
