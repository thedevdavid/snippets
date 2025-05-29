import { betterAuth } from "better-auth";
import { admin, captcha, magicLink } from "better-auth/plugins";
import {
  sendEmail,
  emailTemplates,
} from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/lib/email/resend";
import {
  createDatabaseAdapter,
  type DatabaseAdapter,
} from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/lib/adapters";
import type { Env } from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/env";

export type BetterAuthInstance = ReturnType<typeof betterAuth>;

export interface CreateAuthConfig {
  env: Env;
  adapterType?: DatabaseAdapter;
}

export const createBetterAuthModular = ({
  env,
  adapterType = "drizzle",
}: CreateAuthConfig): { auth: BetterAuthInstance; db: DatabaseAdapter } => {
  const { adapter, db } = createDatabaseAdapter({ type: adapterType, env });

  const FROM_EMAIL = env.EMAIL_FROM_ADDRESS ?? "team@mail.appname.com";

  const auth = betterAuth({
    database: adapter,
    appName: "App Name",
    user: {
      changeEmail: {
        enabled: true,
        sendChangeEmailVerification: async ({ user, newEmail, url, token }) => {
          const template = emailTemplates.changeEmail(url, newEmail, user.name);
          await sendEmail(env, {
            to: newEmail,
            ...template,
          });
        },
      },
      deleteUser: {
        enabled: true,
        sendDeleteAccountVerification: async ({ user, url, token }) => {
          await sendEmail(env, {
            to: user.email,
            subject: "Confirm account deletion",
            html: `
              <h2>Confirm Account Deletion</h2>
              <p>Hi ${user.name || "there"},</p>
              <p>You requested to delete your account. This action cannot be undone.</p>
              <p>Click the link below to confirm:</p>
              <a href="${url}">Delete Account</a>
              <p>This link expires in 24 hours.</p>
            `,
            text: `Confirm account deletion\n\nHi ${
              user.name || "there"
            },\n\nYou requested to delete your account. This action cannot be undone.\n\nClick the link below to confirm:\n${url}\n\nThis link expires in 24 hours.`,
          });
        },
        beforeDelete: async (user) => {
          console.log("Deleting user:", user.id);
          // Add any cleanup logic here
        },
        afterDelete: async () => {
          // Add any post-deletion logic here
        },
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
        const template = emailTemplates.resetPassword(url, user.name);
        await sendEmail(env, {
          to: user.email,
          ...template,
        });
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
    baseURL: env.BETTER_AUTH_URL || "https://appname.com",
    emailVerification: {
      sendVerificationEmail: async ({ user, url, token }) => {
        const template = emailTemplates.verifyEmail(url, user.name);
        await sendEmail(env, {
          to: user.email,
          ...template,
        });
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
    trustedOrigins: env.CORS_ORIGINS?.split(",") || [
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
        secretKey: env.CLOUDFLARE_TURNSTILE_SECRET_KEY ?? "",
        endpoints: [
          "/auth/signin",
          "/auth/signup",
          "/auth/forget-password",
          "/auth/reset-password",
          "/auth/update-password",
        ],
      }),
      magicLink({
        sendMagicLink: async ({ email, url }, request) => {
          await sendEmail(env, {
            to: email,
            subject: "Sign in to your account",
            html: `
              <h2>Sign in to your account</h2>
              <p>Click the button below to sign in to your account:</p>
              <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 6px;">Sign In</a>
              <p>Or copy and paste this link: ${url}</p>
              <p>This link expires in 10 minutes.</p>
            `,
            text: `Sign in to your account\n\nClick the link below to sign in:\n${url}\n\nThis link expires in 10 minutes.`,
          });
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

  return { auth, db: db as unknown as DatabaseAdapter };
};
