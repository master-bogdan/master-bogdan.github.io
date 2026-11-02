# Models

## Command

```text
Command
  name: string
  description: string
  execute(args, context): ReactNode
  hidden?: boolean
```

`CommandContext.executeCommand` lets interactive command output invoke another command without global browser events.

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
