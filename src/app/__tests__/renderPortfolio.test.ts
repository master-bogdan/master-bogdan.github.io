import { describe, expect, it } from 'vitest';
import { renderPortfolioPages } from '../renderPortfolio';

describe('Static portfolio generation', () => {
  it('generates readable terminal views and matching canonical metadata for published content', () => {
    const pages = renderPortfolioPages();
    const post = pages.find((page) => page.relativePath === 'blog/welcome/');
    const project = pages.find((page) => page.relativePath === 'projects/local-ai-lab/');
    expect(post?.html).toContain('Why a Terminal?');
    expect(post?.html).toContain('Happy exploring!');
    expect(post?.html).toContain('data-typewriter-pending');
    expect(post?.html).toContain('aria-label="Terminal command"');
    expect(post?.html).not.toContain('Initializing system...');
    expect(post?.metadata.canonical).toBe('https://master-bogdan.github.io/blog/welcome/');
    expect(project?.html).toContain('custom MCP tools');
    expect(project?.html).toContain('v0.2.0');
    expect(new Set(pages.map((page) => page.relativePath)).size).toBe(pages.length);
  });
});
