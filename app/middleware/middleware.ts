import { NextResponse, NextRequest } from "next/server";
import Jwt from "jsonwebtoken";

export const PUBLIC_ROUTES = ["/auth/signup", "/auth/login"];

export async function middleware(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const path = req.nextUrl.pathname;

    // if match path then next
    if (PUBLIC_ROUTES.includes(path)) {
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // verfy token
    Jwt.verify(token, process.env.JWT_SCERET || "default");

    // return next
    return NextResponse.next();
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}
