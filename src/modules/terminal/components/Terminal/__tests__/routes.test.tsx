import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Terminal } from '..';

const navigateBack = async (): Promise<void> => {
  window.history.back();
  await act(() => vi.advanceTimersByTimeAsync(100));
};

describe('Terminal public routes', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/');
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  it('opens a post immediately from its URL and keeps commands usable', () => {
    window.history.replaceState(null, '', '/blog/welcome/');
    render(<Terminal initialPath="/blog/welcome/" />);
    expect(screen.getByRole('heading', { name: 'Welcome to My Terminal' })).toBeInTheDocument();
    expect(screen.queryByText('Initializing system...')).not.toBeInTheDocument();
    const input = screen.getByRole('textbox', { name: 'Terminal command' });
    expect(input).toHaveFocus();
    fireEvent.change(input, { target: { value: 'PROJECTS local-ai-lab' } });
    fireEvent.submit(input.closest('form')!);
    expect(window.location.pathname).toBe('/projects/local-ai-lab/');
    expect(screen.getByRole('heading', { name: 'Local AI Lab' })).toBeInTheDocument();
    expect(screen.getByText('v0.2.0 ↗')).toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it('navigates links in the same terminal and restores browser history', async () => {
    window.history.replaceState(null, '', '/projects/');
    render(<Terminal initialPath="/projects/" />);
    const input = screen.getByRole('textbox', { name: 'Terminal command' });
    fireEvent.click(screen.getByRole('link', { name: 'Neovim Practice' }));
    expect(window.location.pathname).toBe('/projects/neovim-practice/');
    expect(screen.getByRole('heading', { name: 'Neovim Practice' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Terminal command' })).toBe(input);
    await navigateBack();
    expect(screen.getByRole('heading', { name: 'Featured Projects:' })).toBeInTheDocument();
    window.history.forward();
    await act(() => vi.advanceTimersByTimeAsync(100));
    expect(screen.getByRole('heading', { name: 'Neovim Practice' })).toBeInTheDocument();
  });

  it('shows a short resume, local certification images, and a stable PDF download', () => {
    render(<Terminal initialPath="/resume/" />);
    expect(screen.getByRole('heading', { name: 'Bogdan Shchavinskyi' })).toBeInTheDocument();
    expect(screen.getByText('Platform engineering & DevOps:')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Certified Kubernetes Administrator (CKA)' }),
    ).toHaveAttribute('src', '/certifications/cka.svg');
    expect(
      screen.getByRole('img', { name: 'Certified Kubernetes Application Developer (CKAD)' }),
    ).toHaveAttribute('src', '/certifications/ckad.svg');
    expect(screen.getByRole('link', { name: '[Download PDF]' })).toHaveAttribute(
      'download',
      'Bogdan_Shchavinskyi_CV.pdf',
    );
  });

  it('handles nonexistent posts and projects without publishing broken command URLs', () => {
    render(<Terminal initialPath="/blog/missing/" />);
    expect(screen.getByText(/Post 'missing' not found/)).toBeInTheDocument();
    const input = screen.getByRole('textbox', { name: 'Terminal command' });
    fireEvent.change(input, { target: { value: 'projects missing' } });
    fireEvent.submit(input.closest('form')!);
    expect(screen.getByText(/Project 'missing' not found/)).toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
  });

  it('falls back to URL content when a history entry has unrelated state', () => {
    render(<Terminal initialPath="/resume/" />);
    window.history.replaceState({ command: 123 }, '', '/blog/');
    fireEvent(window, new PopStateEvent('popstate', { state: { command: 123 } }));
    expect(screen.getByRole('heading', { name: 'Blog Posts:' })).toBeInTheDocument();
    window.history.replaceState(null, '', '/');
    fireEvent(window, new PopStateEvent('popstate'));
    expect(screen.getByText('Available Commands:')).toBeInTheDocument();
  });
});
