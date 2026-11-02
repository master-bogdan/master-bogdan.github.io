# Patterns

## Domain-First Modules

Product behavior lives under `src/modules/<domain>`. A module exposes a small public barrel and keeps its types, utilities, components, hooks, and tests close to the behavior they support.

## Component Folders

Non-trivial components use:

```text
ComponentName/
  ComponentName.tsx
  styles.ts
  __tests__/
  index.ts
```

## Registry Commands

The terminal depends on one registry, not conditional logic spread through the UI. Visible command lists are derived from registry metadata. Interactive output uses `CommandContext` instead of browser-global events.

## Pure Content Pipeline

Raw Markdown enters through `BlogPostSource`, one pure parser validates it, and the resulting `BlogPost` is safe for lookup and rendering. Browser ingestion and build validation share this pipeline.

## Behavior-First Tests

Tests prefer stable seams: blog API results, terminal DOM behavior, and the app root. Timer-driven UI uses fake timers in unit tests; the production E2E test uses real browser timing.

## Avoid

- Cross-module imports into another module's private folders
- Command-specific branches in `Terminal`
- Inline static style objects in JSX
- Global browser events for module communication
- Runtime filesystem or server dependencies
- Tests coupled to hook state or implementation order
