# Onboarding

## First Run

```bash
node --version
npm --version
npm ci
npx playwright install chromium
npm run dev
```

Node must be in the supported 24.x range and npm must be 11.x.

## Reading Order

1. `README.md`
2. `GLOSSARY.md`
3. `src/app/App.tsx`
4. `src/modules/terminal/hooks/useTerminal.ts`
5. `src/modules/terminal/commands/commandRegistry.tsx`
6. `src/modules/blog/blogPosts.ts`
7. `src/modules/navigation/routes.ts`
8. `scripts/prerender.mjs`
9. `vite.config.ts`

## Safe First Changes

- Content: add a Markdown post and run `npm run build`.
- Terminal UI: change one component with a colocated behavior test.
- Command: change one handler, then exercise it through the Terminal DOM test.

## Common Gotchas

- The production base path defaults to `/`; overrides must be root-relative URL paths.
- Blog front matter is a strict build contract, not optional metadata.
- Blog posts must be regular files with URL-safe slugs; symbolic links and YAML aliases fail the build.
- Hidden commands are preserved product behavior.
- All command output animates at 10 ms per character. Public routes skip boot but still animate after hydration; browser tests can advance the clock to verify complete content. Tests without JavaScript verify the full static output.
- Direct dependency versions are intentionally exact.

## Before Handoff

```bash
npm run validate
```
