import { Env } from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/env";
import { createDbClient } from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/create-db";
// import { createDefaultDbClient } from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/create-db";
import {
  createBetterAuth,
  type BetterAuthInstance,
} from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/create-auth-runtime";

/**
 * Main entry point for getting the Better Auth instance in the Hono app.
 * This function creates the database connection and auth instance for each request.
 *
 * Usage in Hono routes:
 * ```ts
 * const auth = getAuth(c.env);
 * ```
 */
export function getAuth(env: Env): BetterAuthInstance {
  const db = createDbClient(env);

  // Alternative: Use default adapter
  // const db = createDefaultDbClient(env);

  return createBetterAuth(db, env);
}
