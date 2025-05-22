import type { CookieOptionsWithName } from "@supabase/ssr";
import { DEFAULT_COOKIE_OPTIONS } from "@supabase/ssr";

export const COOKIE_OPTIONS: CookieOptionsWithName = {
  ...DEFAULT_COOKIE_OPTIONS,
  name: "auth_session",
  domain: process.env.COOKIE_DOMAIN ?? ".localhost",
};
