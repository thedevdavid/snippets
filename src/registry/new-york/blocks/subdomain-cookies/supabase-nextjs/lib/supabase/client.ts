import { createBrowserClient } from "@supabase/ssr";
import { COOKIE_OPTIONS } from "@/registry/new-york/blocks/subdomain-cookies/supabase-nextjs/lib/supabase/auth-config";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: COOKIE_OPTIONS,
    }
  );
}
