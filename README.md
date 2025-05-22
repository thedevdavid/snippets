# Snippets

A collection of production-ready fullstack code snippets that you can drop into any project. Works with any Typescript and/or React-based framework and compatible with the shadcn/ui registry.

## Features

- **Drop-in Ready**: Copy and paste or install with shadcn CLI
- **Fullstack**: Complete implementations including client, server, migrations, and config
- **shadcn/ui Compatible**: Uses shadcn registry format for easy installation
- **Production Tested**: All snippets were used in real applications
- **TypeScript First**: Fully typed
- **Multi-Stack Support**: Same features, different tech stacks

## Available Snippets

### Subdomain Cookies

Authentication with cookie sharing across the same origin. It's useful for dashboards and multi-tenant applications. E.g. `app.example.com`, `auth.example.com`, and `example.com`. Or `tenant-a.example.com` and `tenant-b.example.com`.

#### Stack Implementations

- ✅ **Next.js + Supabase** - Supabase Auth, Next.js app router, shadcn/ui
- 🚧 **Next.js + Better-Auth** - Better-Auth, Next.js app router, shadcn/ui (coming May 2025)
- 🚧 **TanStack Start + Supabase** - Supabase Auth, TanStack Start, shadcn/ui (coming May 2025)
- 🚧 **TanStack Start + Better-Auth** - Better-Auth, TanStack Start, shadcn/ui (coming May 2025)

### Organization/workspace Management (coming June 2025)

A collection of snippets for managing organizations and teams.

#### Stack Implementations

- 🚧 **Next.js + Supabase** - Supabase Auth, Next.js app router, shadcn/ui (coming June 2025)
- 🚧 **Next.js + Better-Auth** - Better-Auth, Next.js app router, shadcn/ui (coming June 2025)
- 🚧 **TanStack Start + Supabase** - Supabase Auth, TanStack Start, shadcn/ui (coming June 2025)
- 🚧 **TanStack Start + Better-Auth** - Better-Auth, TanStack Start, shadcn/ui (coming June 2025)

_I'm working on adding more snippets. Might also add a roadmap later. Also, feel free to [contribute your own](./CONTRIBUTING.md)._

## Quick Start

### Using shadcn CLI (Recommended)

```bash
npx shadcn@latest add "https://snippets.thedevdavid.com/r/[snippet-name]/[stack].json"

pnpm dlx shadcn@latest add "https://snippets.thedevdavid.com/r/[snippet-name]/[stack].json"

bunx --bun shadcn@latest add "https://snippets.thedevdavid.com/r/[snippet-name]/[stack].json"
```

### Manual Installation

1. Browse the [registry](./src/registry/new-york/blocks/) to find the snippet you need
2. Copy the relevant files to your project
3. Install dependencies as listed in each snippet's documentation
4. Follow the setup instructions in the docs

## Documentation

Visit [snippets.thedevdavid.com](https://snippets.thedevdavid.com) for:

- Installation guides
- Live demos
- Framework-specific implementations
- Best practices

## Contributing

Contributions are always appreciated wheter it's new snippets, improvements, bug reports, or documentation. Read the [contribution guidelines](./CONTRIBUTING.md) to get started.

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Other Meta

- [Funding](./FUNDING.md)
- [LLMs](https://snippets.thedevdavid.com/llms.txt)
- [thedevdavid.com](https://thedevdavid.com)
