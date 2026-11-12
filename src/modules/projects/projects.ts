export type Project = {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly repository: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly technologies: readonly string[];
  readonly preview?: { readonly src: string; readonly alt: string };
  readonly example?: { readonly title: string; readonly text: string; readonly href: string };
  readonly updates: readonly {
    readonly date: string;
    readonly title: string;
    readonly description: string;
    readonly href: string;
  }[];
};

export const projects: readonly Project[] = [
  {
    slug: 'neovim-practice',
    title: 'Neovim Practice',
    summary:
      'A hands-on LazyVim workbook with 13 guided chapters and timed exercises for editing, navigation, refactoring, and Git workflows.',
    repository: 'https://github.com/master-bogdan/neovim-practice',
    description:
      'Learning editor shortcuts is easier when there is real code to work on. This workbook pairs exact keybindings with practical scenarios and repeatable drills, from modal editing to multi-file refactoring.',
    features: [
      '13 chapters covering editing, search, LSP, Git, AI tools, and complete development workflows.',
      'Eight daily-drill categories with objectives, timing targets, and expected results.',
      'Editable TypeScript, Go, Python, SQL, and Terraform fixtures.',
      'Chapter practice files and daily drills organized separately for guided learning and repetition.',
    ],
    technologies: ['Neovim', 'LazyVim', 'Markdown'],
    example: {
      title: 'Try a multi-file refactoring exercise',
      text: 'Rename a service across five TypeScript files, extract shared retry logic, and verify the edits using project search and quickfix workflows.',
      href: 'https://github.com/master-bogdan/neovim-practice/tree/main/02-Daily-drills/07-multifile',
    },
    updates: [
      {
        date: '2026-10-14',
        title: 'Course and daily-drill layout',
        description:
          'Organized guided chapters under 01-Course and repeatable exercises under 02-Daily-drills, with updated navigation and practice instructions.',
        href: 'https://github.com/master-bogdan/neovim-practice/commit/dcbc365fd8ae9bbfc6159fea20fd1c6068868bb6',
      },
    ],
  },
  {
    slug: 'local-ai-lab',
    title: 'Local AI Lab',
    summary:
      'A Go terminal control center for private local AI workflows, connecting coding agents to local models, web search, and repository knowledge through custom MCP tools.',
    repository: 'https://github.com/master-bogdan/local-ai-lab',
    description:
      'Local AI Lab brings model management, agent tooling, and supporting services into one terminal interface. It integrates OpenCode with Ollama and a custom MCP server so coding agents can search the web and retrieve knowledge from local Git workspaces.',
    features: [
      'Hardware-aware model recommendations and local model management.',
      'Custom MCP tools for cached web search and repository knowledge retrieval.',
      'Local embeddings with Ollama and vector search with Qdrant.',
      'Service lifecycle management, monitoring, updates, rollback, and uninstall.',
      'Native installers for Linux amd64/arm64 and Apple Silicon.',
    ],
    technologies: [
      'Go',
      'Bubble Tea',
      'MCP',
      'Ollama',
      'OpenCode',
      'Qdrant',
      'SearXNG',
      'SQLite',
      'Docker Compose',
    ],
    preview: {
      src: 'projects/local-ai-lab-models.png',
      alt: 'Local AI Lab terminal interface showing the model picker',
    },
    example: {
      title: 'Watch the terminal walkthrough',
      text: 'See the actual control center, model selection, and local workflow management in the project demonstration.',
      href: 'https://github.com/master-bogdan/local-ai-lab/blob/main/assets/tui-demo.gif',
    },
    updates: [
      {
        date: '2026-08-26',
        title: 'v0.2.0',
        description:
          'Published release with native installers and packages for Linux amd64/arm64 and Apple Silicon.',
        href: 'https://github.com/master-bogdan/local-ai-lab/releases/tag/v0.2.0',
      },
    ],
  },
];

export const getProject = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};
