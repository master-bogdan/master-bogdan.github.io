# Code Quality Scorecard

Generated: 2026-08-10

| Category           | Score | Evidence                                                            |
| ------------------ | ----: | ------------------------------------------------------------------- |
| Architecture       |   5/5 | Domain-first modules, public barrels, focused app composition       |
| Runtime safety     |   5/5 | Strict types, timer cleanup, static production runtime              |
| Content validation |   5/5 | Required front matter, calendar dates, duplicate-slug build failure |
| Tests              |   5/5 | API, DOM, app, coverage thresholds, Chromium E2E                    |
| Maintainability    |   5/5 | Split hidden commands, colocated styles, shared theme primitives    |
| Dependency hygiene |   5/5 | Exact pins, lockfile, enforced Node 24/npm 11                       |
| Documentation      |   5/5 | Architecture, flows, models, standards, onboarding, authoring guide |

## Release Gates

- Prettier check
- ESLint with zero warnings
- TypeScript with no emit
- Vitest with 80% minimum for statements, branches, functions, and lines
- Markdown validation during production build
- Playwright Chromium journey against production preview

## Remaining Discipline

Keep the score by preserving public behavior, updating tests before refactors, and refusing invalid authored content at build time.
