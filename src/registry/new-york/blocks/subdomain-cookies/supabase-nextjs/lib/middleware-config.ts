import { NextRequest } from "next/server";

export interface SubdomainConfig {
  // The subdomain pattern (e.g., "app", "auth", "admin")
  subdomain: string;
  // Routes that require authentication for this subdomain
  protectedRoutes?: string[];
  // Routes that should be public even if globally protected
  publicRoutes?: string[];
  // Custom redirect path for unauthenticated users
  loginPath?: string;
  // Minimum required role for this subdomain
  requiredRole?: string;
  // Custom logic to run for this subdomain
  customHandler?: (request: NextRequest) => Promise<Response | void>;
}

export interface MiddlewareConfig {
  // List of subdomain configurations
  subdomains: SubdomainConfig[];
  // Default protected routes (apply to all subdomains unless overridden)
  defaultProtectedRoutes?: string[];
  // Default public routes
  defaultPublicRoutes?: string[];
  // Default login path
  defaultLoginPath?: string;
  // Main domain (without subdomain)
  mainDomain: string;
  // Enable debug logging
  debug?: boolean;
}

export function getSubdomain(
  request: NextRequest,
  mainDomain: string
): string | null {
  const hostname = request.headers.get("host") || "";

  // Handle localhost development
  if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
    // For localhost, we might use ports to simulate subdomains
    // e.g., app.localhost:3000, auth.localhost:3001
    const parts = hostname.split(".");
    if (parts.length > 1 && parts[0] !== "www") {
      return parts[0];
    }
    return null;
  }

  // Handle production domains
  const regex = new RegExp(`^([^.]+)\\.${mainDomain.replace(".", "\\.")}`, "i");
  const match = hostname.match(regex);

  if (match && match[1] !== "www") {
    return match[1];
  }

  return null;
}

export function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some((route) => {
    // Exact match
    if (route === pathname) return true;

    // Wildcard match (e.g., /admin/* matches /admin/users)
    if (route.endsWith("/*")) {
      const baseRoute = route.slice(0, -2);
      return pathname.startsWith(baseRoute);
    }

    // Regex match
    if (route.startsWith("^") && route.endsWith("$")) {
      const regex = new RegExp(route);
      return regex.test(pathname);
    }

    return false;
  });
}

export function getSubdomainConfig(
  subdomain: string | null,
  config: MiddlewareConfig
): SubdomainConfig | null {
  if (!subdomain) return null;

  return config.subdomains.find((s) => s.subdomain === subdomain) || null;
}

export function isProtectedRoute(
  pathname: string,
  subdomain: string | null,
  config: MiddlewareConfig
): boolean {
  const subdomainConfig = getSubdomainConfig(subdomain, config);

  // Check subdomain-specific public routes first
  const publicRoutes =
    subdomainConfig?.publicRoutes || config.defaultPublicRoutes || [];
  if (matchesRoute(pathname, publicRoutes)) {
    return false;
  }

  // Check subdomain-specific protected routes
  const protectedRoutes =
    subdomainConfig?.protectedRoutes || config.defaultProtectedRoutes || [];
  return matchesRoute(pathname, protectedRoutes);
}

export function getLoginPath(
  subdomain: string | null,
  config: MiddlewareConfig
): string {
  const subdomainConfig = getSubdomainConfig(subdomain, config);
  return subdomainConfig?.loginPath || config.defaultLoginPath || "/login";
}

export const defaultMiddlewareConfig: MiddlewareConfig = {
  mainDomain: process.env.NEXT_PUBLIC_DOMAIN || "example.com",
  subdomains: [
    {
      subdomain: "app",
      protectedRoutes: ["/*"],
      publicRoutes: ["/", "/features", "/pricing"],
      loginPath: "/auth/login",
      requiredRole: "user",
    },
    {
      subdomain: "admin",
      protectedRoutes: ["/*"],
      publicRoutes: ["/login"],
      loginPath: "/login",
      requiredRole: "admin",
      customHandler: async (request) => {
        // Custom logic for admin subdomain
        const userRole = request.headers.get("x-user-role");
        if (userRole !== "admin") {
          return new Response("Forbidden", { status: 403 });
        }
      },
    },
    {
      subdomain: "auth",
      protectedRoutes: ["/account/*", "/settings/*"],
      publicRoutes: ["/*"],
      loginPath: "/login",
    },
    {
      subdomain: "api",
      protectedRoutes: ["/v1/*"],
      publicRoutes: ["/health", "/status"],
      customHandler: async (request) => {
        // Add API-specific headers
        const response = new Response();
        response.headers.set("X-API-Version", "1.0");
        return response;
      },
    },
  ],
  defaultProtectedRoutes: ["/dashboard/*", "/account/*", "/settings/*"],
  defaultPublicRoutes: ["/", "/login", "/signup", "/forgot-password"],
  defaultLoginPath: "/login",
  debug: process.env.NODE_ENV === "development",
};
