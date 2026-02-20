import { NextResponse, type NextRequest } from "next/server";
import { getRequestToken, verifyToken } from "@/lib/auth";

const publicRoutes = new Set(["/login", "/register", "/api/auth/login", "/api/auth/register"]);

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api/auth") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  if (publicRoutes.has(pathname)) {
    return NextResponse.next();
  }

  const token = getRequestToken(request);
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await verifyToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"]
};
