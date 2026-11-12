# Personal Website Context

## Language

**Terminal**: the primary interactive surface that accepts commands and renders output.

**Command**: a named action registered in the command registry.

**Visible Command**: a command included in help and quick-command controls.

**Hidden Command**: an executable command excluded from visible command lists.

**Prompt**: the input line identified as `bogdan@homelab:~$`.

**Blog Post**: an authored Markdown file with validated front matter and rendered content.

**Static Build**: deployable browser assets emitted to `build/` by Vite.

**Base Path**: the URL prefix used for the application and local assets; it defaults to `/`.

**Public Route**: a shareable URL that opens a particular content view inside the Terminal.

**Featured Project**: a selected piece of public work with a description, examples, and a repository link.

**Project Update**: a dated milestone for a Featured Project, linked to its source release or change.

## Relationships

- The Terminal executes Commands through one registry.
- A Command is either visible or hidden.
- The `blog` command lists or opens Blog Posts.
- Public Routes address the Blog Post list, individual Blog Posts, the short resume, and Featured Projects.
- A Featured Project can have Project Updates.
- The Static Build validates every Blog Post before emitting assets.
- The Base Path is applied to banner, CV download, and local Markdown image URLs.

## Invariants

- Command input is keyboard-first and remains focused after execution.
- Boot and typewriter sequences clean up their timers.
- Desktop uses a centered, bounded panel; mobile and short windows use the available height.
- Only command output scrolls; the banner, quick commands, command label, and input stay fixed.
- New output starts at the top. Blog lists and posts render immediately without typewriter animation.
- Blog metadata errors and duplicate slugs stop the build.
- Content is local; the production site needs no application server.

- Direct visits and browser history navigation open the requested content in the same Terminal.
