import {
  createResponse,
  updateSessionWithConfig,
} from "@/registry/new-york/blocks/subdomain-cookies/supabase-nextjs/lib/supabase/middleware-enhanced";
import {
  getSubdomain,
  getSubdomainConfig,
  isProtectedRoute,
  MiddlewareConfig,
  getLoginPath,
} from "@/registry/new-york/blocks/subdomain-cookies/supabase-nextjs/lib/middleware-config";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const middlewareConfig: MiddlewareConfig = {
  mainDomain: process.env.NEXT_PUBLIC_DOMAIN || "example.com",
  subdomains: [
    {
      // Main application subdomain
      subdomain: "app",
      protectedRoutes: [
        "/dashboard/*",
        "/projects/*",
        "/settings/*",
        "/billing/*",
      ],
      publicRoutes: [
        "/",
        "/features",
        "/pricing",
        "/login",
        "/signup",
        "/forgot-password",
      ],
      loginPath: "/login",
    },
    {
      // Admin portal subdomain
      subdomain: "admin",
      protectedRoutes: ["/*"], // All routes protected
      publicRoutes: ["/login"],
      loginPath: "/login",
      requiredRole: "admin",
      customHandler: async (request: NextRequest) => {
        // Add admin-specific security headers
        const response = NextResponse.next();
        response.headers.set("X-Frame-Options", "DENY");
        response.headers.set("X-Content-Type-Options", "nosniff");
        return response;
      },
    },
    {
      // Authentication subdomain
      subdomain: "auth",
      protectedRoutes: ["/profile/*", "/security/*", "/sessions/*"],
      publicRoutes: [
        "/",
        "/login",
        "/signup",
        "/forgot-password",
        "/reset-password",
        "/verify-email",
      ],
      loginPath: "/login",
    },
    {
      // API subdomain
      subdomain: "api",
      protectedRoutes: ["/v1/*", "/v2/*"],
      publicRoutes: ["/", "/health", "/status", "/docs", "/docs/*"],
      customHandler: async (request: NextRequest) => {
        // Add CORS headers for API
        const response = NextResponse.next();
        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set(
          "Access-Control-Allow-Methods",
          "GET, POST, PUT, DELETE, OPTIONS"
        );
        response.headers.set(
          "Access-Control-Allow-Headers",
          "Content-Type, Authorization"
        );
        return response;
      },
    },
    {
      // Documentation subdomain
      subdomain: "docs",
      protectedRoutes: ["/admin/*"], // Only admin section protected
      publicRoutes: ["/*"], // Everything else is public
      loginPath: "/login",
    },
  ],
  defaultProtectedRoutes: ["/account/*", "/settings/*", "/api/user/*"],
  defaultPublicRoutes: [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/api/auth/*",
    "/_next/*",
    "/favicon.ico",
  ],
  defaultLoginPath: "/login",
  debug: process.env.NODE_ENV === "development",
};

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const subdomain = getSubdomain(request, middlewareConfig.mainDomain);

  if (middlewareConfig.debug) {
    console.log(`[Middleware] Subdomain: ${subdomain}, Path: ${pathname}`);
  }

  const { supabaseResponse, user } = await updateSessionWithConfig({
    request,
    config: middlewareConfig,
    subdomain: subdomain || undefined,
  });

  // Get subdomain configuration
  const subdomainConfig = getSubdomainConfig(subdomain, middlewareConfig);

  // Run custom handler if available
  if (subdomainConfig?.customHandler) {
    const customResponse = await subdomainConfig.customHandler(request);
    if (customResponse) {
      return customResponse;
    }
  }
  // Check if route is protected
  const isProtected = isProtectedRoute(pathname, subdomain, middlewareConfig);

  if (middlewareConfig.debug) {
    console.log(
      `[Middleware] Protected: ${isProtected}, User: ${user?.email || "none"}`
    );
  }

  // Handle protected routes
  if (isProtected && !user) {
    const loginPath = getLoginPath(subdomain, middlewareConfig);
    const url = request.nextUrl.clone();
    url.pathname = loginPath;

    // Preserve the original URL as a redirect parameter
    url.searchParams.set("redirectTo", pathname);

    return createResponse("redirect", request, supabaseResponse, {
      path: url.toString(),
    });
  }

  // Check role requirements
  if (user && subdomainConfig?.requiredRole) {
    const userRole = user.role || "user";

    if (userRole !== subdomainConfig.requiredRole && userRole !== "admin") {
      // User doesn't have required role
      const url = request.nextUrl.clone();
      url.pathname = "/unauthorized";
      return createResponse("redirect", request, supabaseResponse, {
        path: url.toString(),
      });
    }
  }

  // Handle subdomain-specific redirects
  if (subdomain && user) {
    // Example: Redirect admin users to admin subdomain
    if (
      user.role === "admin" &&
      subdomain !== "admin" &&
      pathname.startsWith("/admin")
    ) {
      const url = request.nextUrl.clone();
      url.hostname = `admin.${middlewareConfig.mainDomain}`;
      return createResponse("redirect", request, supabaseResponse, {
        path: url.toString(),
      });
    }
  }

  const response = createResponse("next", request, supabaseResponse);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
