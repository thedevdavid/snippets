import { betterFetch } from "@better-fetch/fetch";
import { auth } from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/auth";

type BetterAuthSession = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};

/**
 * Fetch the current Better Auth session.
 *
 * Designed for Next.js `middleware.ts` edge runtime where we cannot use
 * `authClient.getSession` (relies on browser APIs).
 * Also works in client and server components.
 *
 * @param options - Configuration options
 * @param options.cookie - Cookie header from the incoming request
 * @param options.baseURL - API base URL. Defaults to NEXT_PUBLIC_BETTER_AUTH_URL
 * @returns Promise containing session data and any error
 */
export async function getBetterAuthSession<
  TSession = BetterAuthSession,
>(options?: { cookie?: string; baseURL?: string }) {
  const { cookie, baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL } =
    options || {};

  const { data, error } = await betterFetch<TSession>("/api/auth/get-session", {
    baseURL,
    credentials: "include",
    // Forward cookies so Better Auth can read the session
    headers: cookie ? { cookie } : undefined,
  });

  return { data, error } as { data: TSession | null; error: Error | null };
}
