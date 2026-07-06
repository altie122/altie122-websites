# altie122

All of the altie122 websites.

Domains attached to this project:
- [https://altie.link](https://altie.link) | /apps/link

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Astro, Self, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Astro** - The web framework for content-driven websites
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm run dev
```

Open;
- [http://localhost:3001](http://localhost:3001) for the link website
- [http://localhost:3002](http://localhost:3002) for the schedule website

## Project Structure

```
altie122/
├── apps/
│   └── link/         # Fullstack application (Astro) | Production domain: https://altie.link
│   └── day/         # Fullstack application (Astro) | Production domain: TBD
├── packages/
```

## Available Scripts

- `pnpm run dev`: Start all applications in development mode
- `pnpm run build`: Build all applications
- `pnpm run check-types`: Check TypeScript types across all apps
