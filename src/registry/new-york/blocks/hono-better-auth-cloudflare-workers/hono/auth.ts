import { betterAuth } from "better-auth";
import { admin, captcha, magicLink } from "better-auth/plugins";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/auth-schema";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    schema,
    provider: "pg",
    usePlural: true,
    debugLogs: true,
  }),
  appName: "App Name",
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url, token }) => {
        console.log(user, newEmail, url, token);
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url, token }) => {
        console.log(user, url, token);
      },
      beforeDelete: async (user) => {
        console.log(user);
      },
      afterDelete: async () => {},
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 90, // 90 days
    preserveSessionInDatabase: true,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    autoSignIn: true,
    sendResetPassword: async ({ user, url, token }) => {
      console.log(user, url, token);
    },
    resetPasswordTokenExpiresIn: 600, // 10 minutes
  },
  advanced: {
    cookiePrefix: "appname",
    useSecureCookies: true,
    crossSubDomainCookies: {
      enabled: true,
      domains: [".appname.com", ".appname.dev", "localhost", "127.0.0.1"],
    },
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      partitioned: true,
    },
    database: {
      generateId: false,
    },
  },
  baseURL: "https://appname.com",
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      console.log(user, url, token);
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 600, // 10 minutes
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Modify user data before creation
          return { data: { ...user } };
        },
        after: async () => {
          // Create organization for user, so they have their personal workspace
        },
      },
      update: {
        before: async (userData) => {
          // Modify user data before update
          return { data: { ...userData, updatedAt: new Date() } };
        },
        after: async () => {
          // Perform actions after user update
        },
      },
    },
    session: {
      // Session hooks
    },
    account: {
      // Account hooks
    },
    verification: {
      // Verification hooks
    },
  },
  trustedOrigins: [
    "https://appname.com",
    "https://app.appname.com",
    "https://appname.dev",
    "https://app.appname.dev",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
  ],
  rateLimit: {
    window: 60,
    max: 100,
    customRules: {
      "/auth/signin": {
        window: 10,
        max: 3,
      },
      "/auth/signup": {
        window: 10,
        max: 3,
      },
    },
  },
  plugins: [
    admin({
      adminRoles: ["admin"],
      defaultRole: "user",
    }),
    captcha({
      provider: "cloudflare-turnstile",
      secretKey: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ?? "Forgot to set",
      endpoints: [
        "/auth/signin",
        "/auth/signup",
        "/auth/forget-password",
        "/auth/reset-password",
        "/auth/update-password",
      ],
    }),
    magicLink({
      sendMagicLink: async (data, request) => {
        console.log(data, request);
      },
      expiresIn: 10 * 60,
      rateLimit: {
        max: 10,
        window: 10 * 60,
      },
      disableSignUp: true,
    }),
  ],
});
