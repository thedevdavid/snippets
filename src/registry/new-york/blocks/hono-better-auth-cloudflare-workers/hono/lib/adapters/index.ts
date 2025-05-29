import { createDrizzleAdapter } from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/lib/adapters/drizzle-adapter";
import { createDatabase } from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/lib/adapters/default-adapter";
import type { Env } from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/env";

export type DatabaseAdapter = "drizzle" | "default";

export interface AdapterConfig {
  type: DatabaseAdapter;
  env: Env;
}

export function createDatabaseAdapter(config: AdapterConfig) {
  switch (config.type) {
    case "drizzle":
      return createDrizzleAdapter(config.env);
    case "default":
      const db = createDatabase(config.env);
      return {
        adapter: db,
        db, // Also provide db reference
      };
    default:
      throw new Error(`Unsupported database adapter: ${config.type}`);
  }
}

export { createDrizzleAdapter, createDatabase as createDefaultAdapter };
