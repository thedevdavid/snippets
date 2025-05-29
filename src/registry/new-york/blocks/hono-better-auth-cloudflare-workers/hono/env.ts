export interface Env {
  HYPERDRIVE: Hyperdrive;
  CORS_ORIGINS: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  CLOUDFLARE_TURNSTILE_SECRET_KEY: string;
  EMAIL_FROM_ADDRESS: string;
  RESEND_API_KEY?: string;
}
