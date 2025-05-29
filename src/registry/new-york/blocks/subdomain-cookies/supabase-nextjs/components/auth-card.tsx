import { createClient } from "@/registry/new-york/blocks/subdomain-cookies/supabase-nextjs/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Label } from "@/registry/new-york/ui/label";
import { Input } from "@/registry/new-york/ui/input";
import { Button } from "@/registry/new-york/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";
import { redirect } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react";

export async function AuthCard() {
  return (
    <Tabs defaultValue="magic-link" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="magic-link">Magic Link</TabsTrigger>
        <TabsTrigger value="email-password">Email Password</TabsTrigger>
      </TabsList>
      <TabsContent value="magic-link">
        <MagicLinkForm />
      </TabsContent>
      <TabsContent value="email-password">
        <EmailPasswordForm />
      </TabsContent>
    </Tabs>
  );
}

export function EmailPasswordForm() {
  const loginWithEmailPassword = async (formData: FormData) => {
    "use server";
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button
              formAction={loginWithEmailPassword}
              type="submit"
              className="w-full"
            >
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function MagicLinkForm() {
  const loginWithMagicLink = async (formData: FormData) => {
    "use server";
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
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <span className="sr-only">Acme Inc.</span>
              </a>
              <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <Button
                formAction={loginWithMagicLink}
                type="submit"
                className="w-full"
              >
                Login
              </Button>
            </div>
          </div>
        </form>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </CardContent>
    </Card>
  );
}
