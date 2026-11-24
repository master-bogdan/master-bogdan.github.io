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

**Article View**: the document reading surface for a Blog Post, with complete text, optional artwork, and a sticky navigation header.

**Contact & CV**: the combined contact links and CV download, addressed by `contacts` and the compatibility alias `resume`.

**Public Route**: a shareable URL that opens a particular terminal output or Article View.

**Featured Project**: a selected piece of public work with a description, examples, and a repository link.

**Project Update**: a dated milestone for a Featured Project, linked to its source release or change.

## Relationships

- The Terminal executes Commands through one registry.
- A Command is either visible or hidden.
- The `blog` command lists or opens Blog Posts.
- Public Routes address the Blog Post list, individual Blog Posts, Contact & CV, and Featured Projects.
- A Featured Project can have Project Updates.
- The Static Build validates every Blog Post before emitting assets.
- The Base Path is applied to banner, CV download, and local Markdown image URLs.

## Invariants

- Command input is keyboard-first and remains focused after execution in the Terminal. Article Views have no Prompt.
- Boot and typewriter sequences clean up their timers.
- The Terminal keeps a stable frame across ordinary Commands, adapting to the available viewport.
- In the Terminal, only command output scrolls; the banner, quick commands, command label, and Prompt stay fixed. Article Views use document scrolling.
- New output starts at the top. Article Views show complete content immediately. Other Command output uses typewriter animation, including Public Routes and browser history navigation.
- Blog metadata errors and duplicate slugs stop the build.
- Content is local; the production site needs no application server.
- Direct content visits, internal returns, banner reset, and browser history navigation skip boot. An initial homepage visit retains boot.
