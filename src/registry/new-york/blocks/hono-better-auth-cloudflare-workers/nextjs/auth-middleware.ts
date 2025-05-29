import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const protectedRoutes = ["/dashboard"];

export const isProtectedRoute = (request: NextRequest) => {
  return protectedRoutes.some(
    (route) =>
      request.nextUrl.pathname === route ||
      request.nextUrl.pathname.startsWith(route)
  );
};

export const authMiddleware = async (request: NextRequest) => {
  const sessionCookie = getSessionCookie(request);

  if (isProtectedRoute(request) && !sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};
