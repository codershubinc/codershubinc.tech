# codershubinc.tech

> Personal portfolio & projects site built with Next.js and Tailwind CSS — demonstrates project listings, README rendering, and GitHub integrations.

## Overview

This repository is the source code for codershubinc.tech — a portfolio site showcasing open-source work, project READMEs, and project details pulled from GitHub.

It uses Next.js (App Router), Tailwind CSS, and the GitHub REST API to fetch and render project content. The site converts Markdown to styled HTML and renders structured file trees and file counts for each project.

### Key Features

- Project list fetched from GitHub repos for `codershubinc`.
- Styled, server-rendered README content with custom Tailwind typography variants.
- File tree parsing (slash-style or ASCII) and file extension counts with language color badges.
- Small API endpoints for supporting content rendering (README fetch/proxy, streak stats, and a Quazaar README test endpoint).
- Server-only utilities and client components for a fast, modern UI.

## Tech Stack

- Next.js (App Router)
- React (Server & Client components)
- Tailwind CSS + Typography plugin
- marked for Markdown parsing
- TypeScript
- Vitest for unit tests

## Local Development

Install dependencies

```bash
pnpm install
# or: npm install
# or: bun install
```

Development server

```bash
pnpm dev
# or: npm run dev
# or: bun dev
```

Build & start

```bash
pnpm build
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

## Testing

Run the tests with

```bash
pnpm test
```

## Environment Variables

Some GitHub routes detect the presence of `GITHUB_TOKEN` to increase rate limits. Set it in your environment when developing or building:

```bash
export GITHUB_TOKEN=ghp_...  # or set through your environment manager
```

## API routes

This project includes a few helpful API routes used in the site and for local development:

- `GET /api/readme?repo=owner/repo` — fetch repository README (raw & rendered HTML), caches locally in `/temp` for convenience.
- `GET /api/streak?user=codershubinc` — proxies `github-readme-streak-stats` JSON output.
- `GET /api/quazaar-readme` — returns an example Quazaar README rendered as HTML (used for testing markdown rendering).

## Code Organization

`src/app/` — Next.js pages and server components (e.g. `projects/`)
`src/lib/` — application libraries (`api/gh/` and `utils/`)
`src/components/` — React UI components (client side)
`src/data/` — static or example data used for demo

## Contributing

Contributions are welcome. To keep the repo clean, please open an issue first for larger work and follow these steps:

1. Fork and clone the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make changes and add tests
4. Submit a PR with a clear description of your work

## Note for maintainers & developers

- `src/lib/api/gh` holds the GitHub integrations split into helpers for fetch and per-file operations.
- `src/lib/utils` is a small, organized utility folder with an `index.ts` barrel to keep import lines compact.
- If reusing components outside the site or under different domains, keep in mind the server-side fetch headers and rate limits.

## License

This repo is licensed under the MIT License.

---

Made with ❤️ by Swapnil Ingle • @codershubinc

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
