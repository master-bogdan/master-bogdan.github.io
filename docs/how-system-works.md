# How The System Works

## Startup

1. Vite loads `index.html` and `src/main.tsx`.
2. `main.tsx` loads the local variable font and global reset.
3. `AppThemeProvider` supplies the MUI theme.
4. `App` renders the terminal.
5. On the homepage, the boot sequence runs before help and the focused prompt appear. Direct content URLs already contain the terminal and selected output; React hydrates them without boot.

## Command Execution

```text
keyboard or quick command
  -> useTerminal.executeCommand
  -> commandRegistry
  -> React output
  -> TypewriterOutput
```

Input is trimmed and split into a lowercase command name plus arguments. Unknown commands return the preserved error. `clear` removes the current output and restores help after the preserved delay. Selecting an internal content link executes its command in the existing terminal and updates browser history. Ctrl/Cmd-click, downloads, and external links retain native browser behavior. Back and Forward restore output immediately, and route metadata follows the selected page.

## Blog Pipeline

1. Vite imports every `content/blog/*.md` file as raw text.
2. The blog parser reads strict YAML front matter without aliases.
3. Required fields and calendar dates are validated.
4. Slugs are normalized, checked for URL-safe syntax, and checked for duplicates.
5. Posts are sorted newest first and exposed through the blog API.
6. `react-markdown` renders post content with GitHub Flavored Markdown; raw HTML and dangerous interactive elements are not rendered.
7. Local image paths receive the configured application base path.

## Production

`npm run build` type-checks first, validates the deployment base path and all regular Markdown post files in Vite's build lifecycle, and writes client assets to `build/`. The prerender step then renders public terminal views to nested HTML pages, adds route-specific metadata, and generates the sitemap. `npm run preview` serves that output for local verification.
