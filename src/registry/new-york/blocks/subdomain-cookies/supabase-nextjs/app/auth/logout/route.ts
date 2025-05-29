import { createClient } from "@/registry/new-york/blocks/subdomain-cookies/supabase-nextjs/lib/supabase/server";
import { COOKIE_OPTIONS } from "@/registry/new-york/blocks/subdomain-cookies/supabase-nextjs/lib/supabase/auth-config";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    // redirect the user to an error page with some instructions
    redirect("/error");
  }

  cookieStore.delete(COOKIE_OPTIONS.name ?? "");

  redirect("/");
}
