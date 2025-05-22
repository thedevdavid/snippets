import { Card, CardContent } from "@/registry/new-york/ui/card";
import { Label } from "@/registry/new-york/ui/label";
import { Input } from "@/registry/new-york/ui/input";
import { Button } from "@/registry/new-york/ui/button";
import { createClient } from "@/registry/new-york/blocks/next-supabase/subdomain-cookies/lib/server";
import { redirect } from "next/navigation";

export async function AuthCard() {
  const login = async (formData: FormData) => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOtp({
      email: formData.get("email") as string,
    });
    if (error) {
      console.error(error);
    }

    redirect("/");
  };

  return (
    <Card>
      <CardContent className="flex flex-col items-center p-2">
        <form className="flex flex-col gap-2 w-full max-w-md mx-auto">
          <Label htmlFor="email">Email:</Label>
          <Input id="email" name="email" type="email" required />
          <Button formAction={login}>Log in</Button>
        </form>
      </CardContent>
    </Card>
  );
}
