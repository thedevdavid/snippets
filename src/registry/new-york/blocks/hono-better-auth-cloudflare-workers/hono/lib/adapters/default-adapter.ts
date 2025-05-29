import { Pool } from "pg";
import type { Env } from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/env";

export function createDatabase(env: Env) {
  return new Pool({
    connectionString: env.HYPERDRIVE.connectionString,
    max: 1, // Hyperdrive handles connection pooling
  });
}
