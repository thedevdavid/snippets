import { Env } from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/env";
import { drizzle } from "drizzle-orm/postgres-js";
import { createDatabase } from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/lib/adapters/default-adapter";
import postgres from "postgres";

// Create Drizzle client (default option)
export function createDbClient(env: Env) {
  const connectionString = env.HYPERDRIVE?.connectionString;

  if (!connectionString) {
    throw new Error("HYPERDRIVE connection string is not set");
  }

  // Disable prefetch as it is not supported for "Transaction" pool mode
  const client = postgres(connectionString, { max: 5 });
  return drizzle(client);
}

export function createDefaultDbClient(env: Env) {
  return createDatabase(env);
}
