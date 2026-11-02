# Architecture

## Shape

The package is a static Vite React application organized by domain. `src/app` composes the site, `src/modules` owns product behavior, and `src/shared` contains cross-module primitives.

```text
index.html -> main.tsx -> AppThemeProvider -> App -> Terminal
                                             |
                          command registry <-+-> blog module
```

## Boundaries

| Boundary               | Responsibility                                                    |
| ---------------------- | ----------------------------------------------------------------- |
| `src/app`              | Composition root and application providers                        |
| `src/config`           | Vite-derived runtime configuration                                |
| `src/modules/terminal` | Boot, prompt, keyboard input, command execution, output animation |
| `src/modules/blog`     | Markdown discovery, front-matter validation, lookup, rendering    |
| `src/shared`           | Theme tokens and theme creation used by multiple modules          |
| `content/blog`         | Authored content, never runtime code                              |

Modules expose public barrels. Internal components use relative imports so module structure can change without leaking private paths.

## Build Boundary

Vite discovers Markdown with `import.meta.glob` for the browser bundle. A build-only plugin independently checks that every `content/blog/*.md` entry is a regular file, reads it without following symbolic links, and runs the same parser before bundling. This makes invalid metadata and duplicate slugs hard build failures.

The output directory remains `build/`. The default base path remains `/`; `VITE_BASE_PATH` can override it with a validated root-relative URL path.

## Test Boundaries

- Blog API tests exercise `getBlogPosts`, `getBlogPost`, and post creation contracts.
- Terminal tests exercise public DOM behavior rather than hook implementation details.
- App tests verify the composition root.
- Playwright exercises the built Chromium experience through boot, keyboard commands, and Markdown navigation.
