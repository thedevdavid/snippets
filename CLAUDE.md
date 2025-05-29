# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `bun run dev` - Start development server with Turbo
- `bun run build` - Build the Next.js application  
- `bun run start` - Start production server
- `bun run registry:build` - Build the component registry
- `bun run ci` - Full CI build (registry + opennextjs-cloudflare)

## Code Style Guidelines
- Use TypeScript with strict mode enabled
- Import paths: Use `@/*` for src imports, `@/.source` for source files
- Components: React functional components with TypeScript
- Styling: Tailwind CSS with `tailwind-merge` for conditional classes
- File naming: kebab-case for files, PascalCase for components
- Use `"use client"` directive for client components in App Router
- Follow Next.js 15 App Router conventions
- Error handling: Use proper TypeScript error types and Zod for validation
- State management: React hooks, avoid global state unless necessary
- Export: Use named exports for utilities, default exports for pages/components

## Testing
No specific test commands found - check with maintainer for testing setup.