# Architecture

## Shape

The package is a static Vite React application organized by domain. `src/app` composes the site, `src/modules` owns product behavior, and `src/shared` contains cross-module primitives.

```text
index.html -> main.tsx -> AppThemeProvider -> App -> Terminal
                                             |
                          command registry <-+-> blog module
```

## Boundaries

| Boundary                 | Responsibility                                                    |
| ------------------------ | ----------------------------------------------------------------- |
| `src/app`                | Composition root and application providers                        |
| `src/config`             | Vite-derived runtime configuration                                |
| `src/modules/terminal`   | Boot, prompt, keyboard input, command execution, output animation |
| `src/modules/navigation` | Base-aware public URL and command mapping                         |
| `src/modules/projects`   | Local featured project content and rendering                      |
| `src/modules/blog`       | Markdown discovery, front-matter validation, lookup, rendering    |
| `src/shared`             | Theme tokens and theme creation used by multiple modules          |
| `content/blog`           | Authored content, never runtime code                              |

Modules expose public barrels. Internal components use relative imports so module structure can change without leaking private paths.

## Build Boundary

Vite discovers Markdown with `import.meta.glob` for the browser bundle. A build-only plugin independently checks that every `content/blog/*.md` entry is a regular file, reads it without following symbolic links, and runs the same parser before bundling. This makes invalid metadata and duplicate slugs hard build failures.

The output directory remains `build/`. The default base path remains `/`; `VITE_BASE_PATH` can override it with a validated root-relative URL path. Prerendering uses Vite's middleware mode with WebSockets disabled. It derives hashes for the inline boot script from the built HTML and adds a production Content Security Policy and referrer policy before generating every page. Development HTML is unaffected.

## Test Boundaries

- Blog API tests exercise `getBlogPosts`, `getBlogPost`, and post creation contracts.
- Terminal tests exercise public DOM behavior rather than hook implementation details.
- App tests verify the composition root.
- Playwright exercises the built Chromium experience through boot, keyboard commands, and Markdown navigation.

## Public Route Boundary

`navigation` maps public content paths to command input without depending on content modules. Blog and project output use ordinary links; `Terminal` intercepts plain same-origin content clicks and executes the corresponding command. Modified clicks, downloads, and external links keep browser behavior. The registry supplies validated command permalinks. `useTerminal` owns output and browser history; `App` owns document metadata.

`src/app/renderPortfolio.tsx` is the build entry for rendering published routes using the same `App`, registry, content, and theme as the browser. `scripts/prerender.mjs` loads it through Vite's SSR pipeline after the client build and writes nested HTML files with route-specific metadata and a sitemap. Deep routes hydrate complete existing markup before beginning the typewriter animation; JavaScript-only pending styles prevent a full-content flash and reveal static output after three seconds if hydration fails. Without JavaScript the complete output remains visible. The homepage mounts normally and retains its boot sequence. No application server or runtime content fetching is introduced.
