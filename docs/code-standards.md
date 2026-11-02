# Code Standards

## TypeScript And React

- Keep strict TypeScript and zero `any` usage.
- Prefer focused functions, direct control flow, and explicit domain names.
- Keep state close to the behavior that owns it.
- Clean up timers and browser resources in effects.
- Use semantic roles and preserve keyboard access.

## Imports And Structure

- Import a different module through its public barrel.
- Use relative imports inside a module.
- Use PascalCase component folders with public `index.ts` barrels.
- Keep static component styles in colocated `styles.ts` files.
- Put genuinely shared values in `src/shared`; do not create speculative abstractions.

## Commands

- Register every command in `commandRegistry`.
- Preserve visible and hidden command names unless intentionally changing the product contract.
- Keep command output functions small and deterministic where possible.
- Use `CommandContext` for command-to-command interaction.

## Blog

- Author posts only under `content/blog`.
- Use regular `.md` files; do not symlink posts.
- Require `title`, `date`, and `slug` front matter.
- Keep slugs unique after lowercase normalization and limit them to letters, numbers, and single hyphens.
- Keep front matter self-contained; YAML aliases are not supported.
- Keep Markdown rendering free of raw HTML execution.
- Put local post images under `public/blog`.

## Dependencies And Runtime

- Pin every direct dependency exactly.
- Use Node.js 24 LTS and npm 11 as enforced by `package.json`.
- Keep the application static and validate deployment base paths as root-relative URL paths.
- Treat `build/` and test reports as generated output.

## Tests

- Work red, green, refactor for behavior changes.
- Test through the blog API, terminal DOM, or application entry seams.
- Keep all four coverage metrics at or above 80%.
- Add Playwright coverage for critical built-site journeys.
