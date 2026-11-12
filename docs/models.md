# Models

## Command

```text
Command
  name: string
  description: string
  execute(args): ReactNode
  href?(args): string | undefined
  hidden?: boolean
```

`href` returns a public permalink for supported content. Output uses ordinary links; the terminal handles internal navigation without content modules depending on interaction state.

## Command Output

```text
CommandOutput
  id: number
  command: string
  output: ReactNode
```

The monotonically increasing `id` remounts the typewriter for repeated commands.

## Blog Post Source

```text
BlogPostSource
  path: string
  markdown: string
```

## Blog Post

```text
BlogPost
  slug: string
  title: string
  date: YYYY-MM-DD string
  content: Markdown string
```

The source is untrusted authored input. Parsing produces the validated post model used by both build validation and browser rendering.

## Project

A featured project has a stable slug, title, summary, repository URL, description, implemented features, technologies, optional preview/example, and curated updates. Each update has a date, title, description, and source URL. These records are maintained locally rather than fetched while browsing.
