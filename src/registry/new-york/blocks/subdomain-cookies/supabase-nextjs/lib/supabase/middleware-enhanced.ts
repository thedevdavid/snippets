import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_OPTIONS } from "@/registry/new-york/blocks/subdomain-cookies/supabase-nextjs/lib/supabase/auth-config";
import { type MiddlewareConfig } from "@/registry/new-york/blocks/subdomain-cookies/supabase-nextjs/lib/middleware-config";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

export async function updateSessionWithConfig({
  request,
  config,
  subdomain,
}: {
  request: NextRequest;
  config: MiddlewareConfig;
  subdomain?: string;
}) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: COOKIE_OPTIONS,
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Do not run code between createServerClient and auth.getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Add user info to headers for downstream use
  if (user) {
    supabaseResponse.headers.set("x-user-id", user.id);
    supabaseResponse.headers.set("x-user-email", user.email || "");
    supabaseResponse.headers.set("x-user-role", user.role || "user");
  }

  // Add subdomain info to headers
  if (subdomain) {
    supabaseResponse.headers.set("x-subdomain", subdomain);
  }

  return { supabaseResponse, user };
}

// Add Supabase cookies to the response
export function handleCookies(
  response: NextResponse,
  sourceCookies: ResponseCookies
): NextResponse {
  sourceCookies.getAll().forEach((cookie) => response.cookies.set(cookie));
  return response;
}

export function createResponse(
  type: "next" | "redirect" | "rewrite",
  request: NextRequest,
  response: NextResponse,
  options?: {
    path?: string;
    headers?: Record<string, string>;
    status?: number;
  }
): NextResponse {
  let res: NextResponse;

  switch (type) {
    case "redirect":
      console.log("[Middleware] Redirecting to", options?.path);
      res = NextResponse.redirect(new URL(options?.path || "/", request.url));
      break;
    case "rewrite":
      console.log("[Middleware] Rewriting to", options?.path);
      res = NextResponse.rewrite(new URL(options?.path || "/", request.url));
      break;
    default:
      console.log("[Middleware] Next");
      res = options?.status
        ? new NextResponse(null, { status: options.status })
        : NextResponse.next();
  }

  if (options?.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      res.headers.set(key, value);
    });
  }

  return handleCookies(res, response.cookies);
}
