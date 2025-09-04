export const runtime = "nodejs";

import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next(); 
  } catch (error) {
    console.error("JWT verification failed:", error);
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("auth-token", "", { maxAge: -1 });
    return response;
  }
}

export const config = {
  matcher: "/chat/:path*",
};

