import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("auth-token")?.value || "";
    if (!token) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: "/chat/:path*",
};
