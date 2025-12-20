<!-- Copilot instructions for contributors and AI coding agents -->
# Repository-specific Copilot guidance

This file contains focused, actionable guidance for AI coding agents working in this Astro + Tailwind + React codebase.

- Purpose: Help an AI be immediately productive by calling out architecture, conventions, dev commands, and concrete code examples.

1) Quick dev commands
- Install: `npm install`
- Local dev server: `npm run dev` (runs `astro dev`, default port 4321)
- Build: `npm run build` (runs `astro build`), then `npm run postbuild` runs `pagefind --site dist` to generate search index
- Preview built site: `npm run preview`

2) High-level architecture
- Framework: Astro (see `astro.config.mjs`) with `output: 'server'` and Vercel adapter (`@astrojs/vercel`).
- UI: Tailwind CSS + some React components (`@astrojs/react`).
- Content-driven: markdown content stored under `src/content/` and consumed via `astro:content` helpers. Look at `src/lib/contentParser.ts` for i18n-aware helpers.

3) Key conventions and patterns
- Internationalization: locales `es` and `en` are configured in `astro.config.mjs` (default `es`). Content filenames and collection ids include language suffixes (example: `content/projects/cooky.en.md` and `content/projects/cooky.es.md`). The codebase expects language information in entry ids; see `extractLangFromId` in `src/lib/contentParser.ts`.
- Content IDs & indexes: index entries follow `index{lang}` pattern (e.g. `indexen`, `indexes` handling in `getIndex`). Prefer using the provided helpers `getI18nEntries`, `getI18nIndex`, and `getEntriesBatch`.
- Component layout: reusable primitives live under `src/components/base/`, common UI under `src/components/common/`, and project-specific layouts under `src/components/projects/`. Example: `src/components/base/BaseLayout.astro` is the page wrapper.
- Auto-imports: `astro.config.mjs` uses `astro-auto-import` for a small set of components (e.g. `@components/common/Button.astro`). Do not rely on global imports beyond those configured; explicitly import other components.

4) Build & deployment notes
- Adapter: site uses Vercel adapter and server output — expect server runtime behaviour when testing built output.
- Search: `pagefind` is used in `postbuild` to index `dist`.
- Keep CSS utility classes in `src/styles/` and Tailwind config in `tailwind.config.js`.

5) Files to inspect for behavior examples
- Content i18n and collection helpers: [src/lib/contentParser.ts](src/lib/contentParser.ts)
- Root config and integrations: [astro.config.mjs](astro.config.mjs)
- Scripts and dependencies: [package.json](package.json)
- Page scaffolding and routes: `src/pages/` and layouts in `src/components/base/`

6) What to avoid / common pitfalls
- Don't assume entries are language-agnostic — always respect language when fetching content. Use the `lang` option in content helpers.
- Avoid changing `output: 'server'` or the adapter without coordinating deploy expectations.
- When adding imports rely on explicit imports unless added to `astro-auto-import` in `astro.config.mjs`.

7) Examples (quick copy-ready snippets)
- Get localized project entries (from other code):
  ```ts
  import { getI18nEntries } from './src/lib/contentParser';
  const projects = await getI18nEntries('projects', undefined, 'en');
  ```
- Start dev server:
  ```bash
  npm run dev
  ```

If anything here is unclear or you want additional rules (testing, branch naming, commit message style), tell me which area to expand.
