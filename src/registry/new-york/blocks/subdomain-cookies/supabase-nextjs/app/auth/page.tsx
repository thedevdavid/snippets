import { AuthCard } from "@/registry/new-york/blocks/subdomain-cookies/supabase-nextjs/components/auth-card";

export default async function Page() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4">
      <AuthCard />
    </div>
  );
}
