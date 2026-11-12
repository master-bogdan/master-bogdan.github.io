# Personal Website Guide

This package is a static Vite/React terminal portfolio. Preserve command names, hidden commands, boot timing, keyboard behavior, public content, URLs, and visual appearance unless the task explicitly changes them.

## Start Here

1. Read `README.md` and `GLOSSARY.md`.
2. Read `docs/architecture.md` before moving boundaries.
3. Read `src/modules/terminal/commands/commandRegistry.tsx` before changing commands.
4. Read `src/modules/terminal/hooks/useTerminal.ts` before changing interaction state.
5. Read `src/modules/blog/README.md` if one is added; otherwise use the authoring contract in `README.md`.

## Task Routing

- App composition: `src/app/`
- Build/base path: `vite.config.ts`, `src/config/`
- Blog ingestion: `src/modules/blog/blogPosts.ts`, `src/modules/blog/utils/`
- Blog command rendering: `src/modules/blog/commands/`
- Command behavior: `src/modules/terminal/commands/`
- Terminal behavior: `src/modules/terminal/hooks/`, `src/modules/terminal/components/`
- Theme primitives: `src/shared/`
- Authored posts: `content/blog/`

## Working Rules

- Keep module internals private; import modules through their public `index.ts` outside that module.
- Keep component styles in colocated `styles.ts` files.
- Register all commands in the central registry and mark hidden commands explicitly.
- Load regular Markdown files from `content/blog` at build time; do not follow symbolic links or add runtime file or server dependencies.
- Preserve strict TypeScript and exact dependency pins.
- Do not edit generated `build/`, `coverage/`, `playwright-report/`, or `test-results/` output as source.
- Do not invent personal facts, links, resume data, or contact details.

## Verification

Run the narrowest relevant test during development, then finish with:

```bash
npm run validate
```

## Agent skills

### Issue tracker

Track issues in GitHub Issues. Before issue operations, read `docs/agents/issue-tracker.md`.

### Triage labels

Use the five canonical triage labels. Before applying triage labels, read `docs/agents/triage-labels.md`.

### Domain docs

Use a single-context glossary and ADR layout. Before domain exploration, read `docs/agents/domain.md`.
