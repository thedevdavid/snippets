import { Env } from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/env";
import {
  createDbClient,
  createDefaultDbClient,
} from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/create-db";
import {
  createBetterAuth,
  type BetterAuthInstance,
} from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/create-auth";

export function getAuth(env: Env): BetterAuthInstance {
  const db = createDbClient(env);

  // Alternative: Use default adapter
  // const db = createDefaultDbClient(env);

  return createBetterAuth(db, env);
}
