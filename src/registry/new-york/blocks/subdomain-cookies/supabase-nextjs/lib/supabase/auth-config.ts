import type { CookieOptionsWithName } from "@supabase/ssr";
import { DEFAULT_COOKIE_OPTIONS } from "@supabase/ssr";

export const COOKIE_OPTIONS: CookieOptionsWithName = {
  ...DEFAULT_COOKIE_OPTIONS,
  name: "auth_session",
  domain: process.env.COOKIE_DOMAIN ?? ".localhost",
  path: "/",
  maxAge: 60 * 60 * 24 * 365, // 1 year
  sameSite: "lax" as const,
};
