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
2. `CONTEXT.md`
3. `src/app/App.tsx`
4. `src/modules/terminal/hooks/useTerminal.ts`
5. `src/modules/terminal/commands/commandRegistry.tsx`
6. `src/modules/blog/blogPosts.ts`
7. `vite.config.ts`

## Safe First Changes

- Content: add a Markdown post and run `npm run build`.
- Terminal UI: change one component with a colocated behavior test.
- Command: change one handler, then exercise it through the Terminal DOM test.

## Common Gotchas

- The production URL has a non-root base path by default; overrides must be root-relative URL paths.
- Blog front matter is a strict build contract, not optional metadata.
- Blog posts must be regular files with URL-safe slugs; symbolic links and YAML aliases fail the build.
- Hidden commands are preserved product behavior.
- Command output is animated, so tests must account for timers.
- Direct dependency versions are intentionally exact.

## Before Handoff

```bash
npm run validate
```
