import { Resend } from "resend";
import type { Env } from "@/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/env";

export interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export async function sendEmail(
  env: Env,
  options: EmailOptions
): Promise<void> {
  if (!env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured, email not sent:", options);
    return;
  }

  const resend = new Resend(env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: env.EMAIL_FROM_ADDRESS || "noreply@example.com",
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text ?? "",
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email");
  }
}

// Email templates
export const emailTemplates = {
  verifyEmail: (url: string, name?: string) => ({
    subject: "Verify your email address",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Verify your email</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #000;
              color: #fff;
              text-decoration: none;
              border-radius: 6px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 14px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <h2>Verify your email address</h2>
          <p>Hi${name ? ` ${name}` : ""},</p>
          <p>Please click the button below to verify your email address:</p>
          <a href="${url}" class="button">Verify Email</a>
          <p>Or copy and paste this link in your browser:</p>
          <p style="word-break: break-all; color: #666;">${url}</p>
          <p>This link will expire in 24 hours.</p>
          <div class="footer">
            <p>If you didn't create an account, you can safely ignore this email.</p>
          </div>
        </body>
      </html>
    `,
    text: `
Verify your email address

Hi${name ? ` ${name}` : ""},

Please click the link below to verify your email address:

${url}

This link will expire in 24 hours.

If you didn't create an account, you can safely ignore this email.
    `.trim(),
  }),

  resetPassword: (url: string, name?: string) => ({
    subject: "Reset your password",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Reset your password</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #000;
              color: #fff;
              text-decoration: none;
              border-radius: 6px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 14px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <h2>Reset your password</h2>
          <p>Hi${name ? ` ${name}` : ""},</p>
          <p>You requested to reset your password. Click the button below to continue:</p>
          <a href="${url}" class="button">Reset Password</a>
          <p>Or copy and paste this link in your browser:</p>
          <p style="word-break: break-all; color: #666;">${url}</p>
          <p>This link will expire in 1 hour.</p>
          <div class="footer">
            <p>If you didn't request a password reset, you can safely ignore this email.</p>
          </div>
        </body>
      </html>
    `,
    text: `
Reset your password

Hi${name ? ` ${name}` : ""},

You requested to reset your password. Click the link below to continue:

${url}

This link will expire in 1 hour.

If you didn't request a password reset, you can safely ignore this email.
    `.trim(),
  }),

  changeEmail: (url: string, newEmail: string, name?: string) => ({
    subject: "Confirm your email change",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Confirm email change</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #000;
              color: #fff;
              text-decoration: none;
              border-radius: 6px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 14px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <h2>Confirm your email change</h2>
          <p>Hi${name ? ` ${name}` : ""},</p>
          <p>You requested to change your email address to: <strong>${newEmail}</strong></p>
          <p>Please click the button below to confirm this change:</p>
          <a href="${url}" class="button">Confirm Email Change</a>
          <p>Or copy and paste this link in your browser:</p>
          <p style="word-break: break-all; color: #666;">${url}</p>
          <p>This link will expire in 24 hours.</p>
          <div class="footer">
            <p>If you didn't request this change, please secure your account immediately.</p>
          </div>
        </body>
      </html>
    `,
    text: `
Confirm your email change

Hi${name ? ` ${name}` : ""},

You requested to change your email address to: ${newEmail}

Please click the link below to confirm this change:

${url}

This link will expire in 24 hours.

If you didn't request this change, please secure your account immediately.
    `.trim(),
  }),
};
