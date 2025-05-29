import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/db-schema";
import type { Env } from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/env";

export function createDrizzleAdapter(env: Env) {
  const client = postgres(env.HYPERDRIVE.connectionString, {
    prepare: false,
  });

  const db = drizzle(client, {
    schema,
    logger: process.env.NODE_ENV === "development",
  });

  return {
    adapter: drizzleAdapter(db, {
      provider: "pg",
      schema,
      usePlural: true,
    }),
    db, // Export db instance for custom queries
  };
}
