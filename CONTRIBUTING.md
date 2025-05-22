# Contributing to Snippets

First, thanks for wanting to contribute. I appreciate it.

## What is likely to be accepted

**Improvements** to existing snippets - better error handling, performance optimizations, alternative services, more deployment options, etc. E.g.:

- An existing snippet that uses Next.js redone using TanStack Start
- An existing snippet that lacks production-ready error handling

**New snippets** that solve real problems developers face when integrating multiple tools. Think:

- Complete auth flows (client & server)
- Payment processing (including webhooks, error handling, billing, etc.)
- File upload (includes storage, permissions, signed URLs, etc.)
- Real-time features (drop-in ready)
- Complex forms (including validation, submission handling, etc.)

## Before you start

1. **Check if it already exists** - browse `/src/registry/` to see what's already there
2. **Open an issue first** for new snippets - let's chat about the idea before you build it
3. **Pick your stack** - though this project supports multiple implementations, it's best to choose one first, then expand from there.

## How to contribute a new snippet

### 1. Set up your dev environment

```bash
git clone https://github.com/thedevdavid/snippets.git
cd snippets
bun install
bun run dev
```

### 2. Create your snippet

**File structure:**

```
src/registry/new-york/blocks/[snippet-name]/[stack].json
├── components/           # React components
├── db/                   # Database migrations
├── lib/                  # Utilities, configs, server code
└── app/                  # Pages, API routes
```

**Example structure for a payment snippet using Stripe, Next.js, and Supabase:**

```
src/registry/new-york/blocks/payments/next-supabase-stripe/
├── components/
│   ├── checkout-form.tsx
│   └── payment-status.tsx
├── lib/
│   ├── stripe-client.ts
│   ├── stripe-server.ts
│   └── webhook-handler.ts
├── db/
│   └── migration.sql
├── app/
│   ├── checkout/page.tsx
└── └── api/webhooks/stripe/route.ts
```

### 3. What to include

**Client code:**

- TypeScript with proper types
- Tailwind CSS styling (using CSS variables)
- Proper error states and loading states
- Responsive design

**Server code:**

- API with error handling
- Middleware (if applicable)
- Database schemas/migrations
- Environment variable examples

**Database:**

- Migrations
- Environment variable templates

**Configuration:**

- `next.config.ts` updates (if applicable)
- Middleware configuration (if applicable)
- Environment variable templates
- Package.json dependencies

**Documentation:**

- Clear setup instructions
- Environment variable explanations
- Deployment notes
- Common troubleshooting

### 4. Registry entry

Add your snippet to `registry.json`:

```json
{
  "name": "next-supabase-stripe",
  "title": "Stripe Checkout Flow with Next.js and Supabase",
  "type": "registry:block",
  "description": "Complete Stripe checkout with webhooks and status tracking using Stripe, Next.js and Supabase",
  "registryDependencies": ["button", "card", "form"],
  "dependencies": ["stripe", "@stripe/stripe-js", "@supabase/supabase-js"],
  "author": "yourusername <https://github.com/yourusername>",
  "categories": ["payments", "ecommerce", "stripe"],
  "files": [
    // ... your files
  ]
}
```

### 5. Write docs

Create documentation in `content/docs/snippets/[snippet-name]/[stack]/`:

- `installation.mdx` - How to install and set up
- `usage.mdx` - Code examples and customization
- Any framework-specific guides

## Code standards

**Keep it simple:**

- Write code you'd want to copy-paste into your own project
- No over-engineering or unnecessary abstractions
- Comments only when the code isn't self-explanatory

**Make it work:**

- Test everything locally before submitting
- Include proper error handling
- Make sure it actually deploys (not just runs in dev)

**Follow conventions:**

- Use existing patterns from other snippets
- Stick to the project's TypeScript and Tailwind setup
- File naming: kebab-case for files, PascalCase for components

## Testing your snippet

1. **Install it with the CLI:**

```bash
npx shadcn@latest add "http://localhost:3000/r/[your-snippet].json"

pnpm dlx shadcn@latest add "http://localhost:3000/r/[your-snippet].json"

bunx --bun shadcn@latest add "http://localhost:3000/r/[your-snippet].json"
```

2. **Test the happy path and error cases**
3. **Try deploying it** (Cloudflare, Vercel, Coolify, etc.)
4. **Make sure docs are accurate**

## Pull request process

1. **Fork and branch** - create a branch like `feat/stripe-checkout` or `fix/auth-bug`
2. **One feature per PR** - don't bundle unrelated changes
3. **Write a good description** - what does this do? why is it useful?
4. **Update docs**

## Commit messages

Keep them simple:

- `feat: added stripe checkout snippet`
- `fix: handled auth redirect edge case`
- `docs: updated supabase setup instructions`

## Need help?

- **Questions?** Open a [discussion](https://github.com/thedevdavid/snippets/discussions)
- **Stuck?** Drop a comment in your PR and tag @thedevdavid
- **Ideas?** Open an issue with the `enhancement` label

## What I can't accept

- Snippets that only work in development
- Code that requires paid services without free tiers
- Anything that doesn't follow the project's code of conduct

---

Thanks for contributing!
