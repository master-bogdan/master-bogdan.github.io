# How The System Works

## Startup

1. Vite loads `index.html` and `src/main.tsx`.
2. `main.tsx` loads the local variable font and global reset.
3. `AppThemeProvider` supplies the MUI theme.
4. `App` renders the terminal.
5. On the homepage, the boot sequence runs before help and the focused prompt appear. Direct content URLs already contain the terminal and selected output; React hydrates them without boot. Articles show their complete body and optional artwork immediately in a document view with a sticky header; other command output keeps the typewriter animation.

## Command Execution

```text
keyboard or quick command
  -> useTerminal.executeCommand
  -> commandRegistry
  -> React output
  -> complete Article View with no prompt or typewriter
     OR TypewriterOutput for other commands
```

Input is trimmed and split into a lowercase command name plus arguments. Unknown commands return the preserved error. `clear` removes the current output and restores help after the preserved delay. Selecting an internal content link executes its command in the existing terminal and updates browser history. Ctrl/Cmd-click, downloads, and external links retain native browser behavior. Back and Forward restore the selected output and its article or ordinary terminal layout, and route metadata follows the selected page. Home/author/Terminal links and the clickable terminal banner reset to help without boot. The prompt regains focus after terminal output changes.

## Blog Pipeline

1. Vite imports every `content/blog/*.md` file as raw text.
2. The blog parser reads strict YAML front matter without aliases.
3. Required fields, calendar dates, and optional local preview-image paths are validated.
4. Slugs are normalized, checked for URL-safe syntax, and checked for duplicates.
5. Posts are sorted newest first and exposed through the blog API.
6. `react-markdown` renders post content with GitHub Flavored Markdown; raw HTML and dangerous interactive elements are not rendered.
7. Local image paths receive the configured application base path. Optional preview images appear unchanged in the article and in sharing metadata, while the blog index remains text-only.

## Production

`npm run build` type-checks first, validates the deployment base path and all regular Markdown post files in Vite's build lifecycle, and writes client assets to `build/`. The prerender step then renders public terminal views to nested HTML pages, adds route-specific metadata, and generates the sitemap. `npm run preview` serves that output for local verification.
