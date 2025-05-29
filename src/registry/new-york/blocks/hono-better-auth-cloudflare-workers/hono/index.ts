import { getAuth } from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/use-auth";
import { Hono } from "hono";
import { every } from "hono/combine";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import type { Env } from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/env";
import { auth } from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/auth";

type AuthInstance = ReturnType<typeof getAuth>;
type BetterAuthSession = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};

const app = new Hono<{
  Bindings: Env;
  Variables: BetterAuthSession & {
    auth: AuthInstance;
  };
}>({
  strict: false,
});

app.use("*", async (c, next) => {
  const auth = getAuth(c.env);
  c.set("auth", auth);
  await next();
});

app.use("*", async (c, next) => {
  const auth = c.get("auth");
  try {
    const sessionResult = (await auth.api.getSession({
      headers: c.req.raw.headers,
    })) as BetterAuthSession | null;

    if (!sessionResult) {
      c.set("user", null);
      c.set("session", null);
    } else {
      c.set("user", sessionResult.user);
      c.set("session", sessionResult.session);
    }
  } catch (error) {
    console.error("Error getting session:", error);
    c.set("user", null);
    c.set("session", null);
  }
  await next();
});

app.use("*", async (c, next) => {
  const middleware = every(
    cors({
      origin: (origin, ctx = c) => {
        const corsOriginsString = ctx.env.CORS_ORIGINS;
        const allowedOrigins = corsOriginsString.split(",");

        if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
          return origin;
        }

        if (!origin && process.env.NODE_ENV === "development") {
          return "*";
        }

        return undefined;
      },
      allowMethods: ["POST", "GET", "OPTIONS"],
      allowHeaders: [
        "Content-Type",
        "Authorization",
        "Accept",
        "x-captcha-response",
      ],
      maxAge: 600,
      credentials: true,
    }),
    logger()
  );
  await middleware(c, next);
});

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  const auth = c.get("auth");
  return auth.handler(c.req.raw);
});

app.get("/session", async (c) => {
  const session = c.get("session");
  const user = c.get("user");

  if (!user) return c.body(null, 401);

  return c.json({
    session,
    user,
  });
});

app.onError((err, c) => {
  console.error(err);
  return c.text("API Error", 500);
});

export default app;
