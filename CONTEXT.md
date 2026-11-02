# Personal Website Context

## Language

**Terminal**: the primary interactive surface that accepts commands and renders output.

**Command**: a named action registered in the command registry.

**Visible Command**: a command included in help and quick-command controls.

**Hidden Command**: an executable command excluded from visible command lists.

**Prompt**: the input line identified as `bogdan@homelab:~$`.

**Blog Post**: an authored Markdown file with validated front matter and rendered content.

**Static Build**: deployable browser assets emitted to `build/` by Vite.

**Base Path**: the URL prefix used for the application and local assets; it defaults to `/personal-website/`.

## Relationships

- The Terminal executes Commands through one registry.
- A Command is either visible or hidden.
- The `blog` command lists or opens Blog Posts.
- The Static Build validates every Blog Post before emitting assets.
- The Base Path is applied to banner, CV download, and local Markdown image URLs.

## Invariants

- Command input is keyboard-first and remains focused after execution.
- Boot and typewriter sequences clean up their timers.
- Blog metadata errors and duplicate slugs stop the build.
- Content is local; the production site needs no application server.
