# Better Auth + Cloudflare Workers Architecture

This directory contains the Better Auth configuration for use with Cloudflare Workers and Hono.

## File Structure

- **`auth.ts`** - CLI configuration for Better Auth schema generation. This file is required by the Better Auth CLI commands (`generate`, `migrate`). It contains a minimal configuration focused only on schema-affecting options.

- **`create-auth-runtime.ts`** - Runtime factory function that creates the actual Better Auth instance with all runtime dependencies (email sending, environment variables, etc.). This is what gets used when the application runs.

- **`use-auth.ts`** - Main entry point that combines database creation with auth instance creation. This is what gets imported in your Hono routes.

- **`index.ts`** - The Hono application that uses the auth instance.

- **`db-schema.ts`** - Database schema definitions for Better Auth tables.

- **`create-db.ts`** - Database client creation for Cloudflare Hyperdrive.

## Usage

### For Development (Schema Generation)

```bash
# Generate the database schema
npx @better-auth/cli generate

# Or if you need to specify the config file
npx @better-auth/cli generate --config src/registry/new-york/blocks/hono-better-auth-cloudflare-workers/hono/auth.ts
```

### In Your Application

```typescript
// In your Hono routes
import { getAuth } from "./use-auth";

app.use("*", async (c, next) => {
  const auth = getAuth(c.env);
  c.set("auth", auth);
  await next();
});
```

## Why This Architecture?

1. **Separation of Concerns**: The CLI needs a simple configuration without runtime dependencies, while the actual application needs full configuration with email handlers, environment variables, etc.

2. **Cloudflare Workers Compatibility**: We can't use Node.js modules like `pg` directly in Workers. The runtime configuration uses Hyperdrive for database connections.

3. **Type Safety**: By keeping the configurations separate, we maintain proper typing for both CLI usage and runtime usage.

4. **Flexibility**: The factory pattern in `create-auth-runtime.ts` allows for easy testing and different configurations per environment.
