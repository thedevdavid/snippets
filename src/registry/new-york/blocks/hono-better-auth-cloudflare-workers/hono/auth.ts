import { betterAuth } from "better-auth";
import { admin, captcha, magicLink } from "better-auth/plugins";
import * as schema from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/db-schema";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ?? "Forgot to set DATABASE_URL to .env",
});
export const db = drizzle(pool, { schema });

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    schema,
    provider: "pg",
    usePlural: true,
    debugLogs: true,
  }),

  // Schema-affecting configurations
  user: {
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },

  // Plugins that affect schema
  plugins: [
    admin({
      adminRoles: ["admin"],
      defaultRole: "user",
    }),
    captcha({
      provider: "cloudflare-turnstile",
      secretKey: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY || "dummy-for-cli",
    }),
    magicLink({
      sendMagicLink: async () => {
        // Dummy function for CLI schema generation
      },
      disableSignUp: true,
    }),
  ],
});
