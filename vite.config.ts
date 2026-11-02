import { glob, lstat, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';

import { normalizeBasePath } from './src/config/normalizeBasePath.ts';
import { createBlogPosts, type BlogPostSource } from './src/modules/blog/build.ts';

const ProjectDirectory = import.meta.dirname;
const DefaultBasePath = '/personal-website/';

const readBlogPostSource = async (relativePath: string): Promise<BlogPostSource> => {
  const absolutePath = path.join(ProjectDirectory, relativePath);
  const fileStats = await lstat(absolutePath);

  if (!fileStats.isFile()) {
    throw new Error(`${relativePath}: expected a regular Markdown file`);
  }

  return {
    path: relativePath,
    markdown: await readFile(absolutePath, 'utf8'),
  };
};

const loadBlogPostSources = async (): Promise<readonly BlogPostSource[]> => {
  const relativePaths: string[] = [];

  for await (const relativePath of glob('content/blog/*.md', {
    cwd: ProjectDirectory,
  })) {
    relativePaths.push(relativePath);
  }

  return Promise.all(relativePaths.map(readBlogPostSource));
};

const validateBlogPosts = (): Plugin => ({
  name: 'validate-blog-posts',
  apply: 'build',
  async buildStart() {
    createBlogPosts(await loadBlogPostSources());
  },
});

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, ProjectDirectory, 'VITE_');
  const base = normalizeBasePath(environment.VITE_BASE_PATH ?? DefaultBasePath);

  return {
    base,
    plugins: [validateBlogPosts(), react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      outDir: 'build',
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: 'react',
                test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
                priority: 3,
              },
              {
                name: 'mui',
                test: /node_modules[\\/](@emotion|@mui|react-transition-group)[\\/]/,
                priority: 2,
              },
              {
                name: 'markdown',
                test: /node_modules[\\/](react-markdown|remark-|unified|mdast-|micromark|hast-|unist-)/,
                priority: 1,
              },
            ],
          },
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      exclude: ['e2e/**', 'node_modules/**', 'build/**'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/**/*.test.{ts,tsx}',
          'src/**/__tests__/**',
          'src/main.tsx',
          'src/vite-env.d.ts',
        ],
        thresholds: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  };
});
