import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Terminal } from '..';

const navigateBack = async (): Promise<void> => {
  window.history.back();
  await act(() => vi.advanceTimersByTimeAsync(1000));
};

describe('Terminal public routes', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/');
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  it('opens a direct article and navigates to terminal project pages', async () => {
    window.history.replaceState(null, '', '/blog/welcome/');
    render(<Terminal initialPath="/blog/welcome/" />);
    expect(screen.getByRole('heading', { name: 'Welcome to My Terminal' })).toBeInTheDocument();
    expect(screen.getByText('Happy exploring!')).toBeInTheDocument();
    expect(screen.getAllByText('Welcome to My Terminal')).toHaveLength(1);
    expect(screen.queryByText('Initializing system...')).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'Terminal command' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: 'Projects' }));
    await act(() => vi.advanceTimersByTimeAsync(5000));
    const input = screen.getByRole('textbox', { name: 'Terminal command' });
    fireEvent.change(input, { target: { value: 'PROJECTS local-ai-lab' } });
    fireEvent.submit(input.closest('form')!);
    await act(() => vi.advanceTimersByTimeAsync(20_000));
    expect(window.location.pathname).toBe('/projects/local-ai-lab/');
    expect(screen.getByRole('heading', { name: 'Local AI Lab' })).toBeInTheDocument();
    expect(screen.getByText('v0.2.0 ↗')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /^Bogdan Shchavinskyi/ })).toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it('navigates links in the same terminal and restores browser history', async () => {
    window.history.replaceState(null, '', '/projects/');
    render(<Terminal initialPath="/projects/" />);
    await act(() => vi.advanceTimersByTimeAsync(5000));
    const input = screen.getByRole('textbox', { name: 'Terminal command' });
    fireEvent.click(screen.getByRole('link', { name: 'Neovim Practice' }));
    await act(() => vi.advanceTimersByTimeAsync(1000));
    expect(window.location.pathname).toBe('/projects/neovim-practice/');
    expect(screen.getByRole('heading', { name: 'Neovim Practice' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Terminal command' })).toBe(input);
    await navigateBack();
    expect(screen.getByRole('heading', { name: 'Featured Projects:' })).toBeInTheDocument();
    window.history.forward();
    await act(() => vi.advanceTimersByTimeAsync(1000));
    expect(screen.getByRole('heading', { name: 'Neovim Practice' })).toBeInTheDocument();
  });

  it('handles nonexistent posts and projects without publishing broken command URLs', async () => {
    render(<Terminal initialPath="/blog/missing/" />);
    await act(() => vi.advanceTimersByTimeAsync(2000));
    expect(screen.getByText(/Post 'missing' not found/)).toBeInTheDocument();
    const input = screen.getByRole('textbox', { name: 'Terminal command' });
    fireEvent.change(input, { target: { value: 'projects missing' } });
    fireEvent.submit(input.closest('form')!);
    await act(() => vi.advanceTimersByTimeAsync(20_000));
    expect(screen.getByText(/Project 'missing' not found/)).toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
  });

  it('falls back to URL content when a history entry has unrelated state', async () => {
    render(<Terminal initialPath="/resume/" />);
    window.history.replaceState({ command: 123 }, '', '/blog/');
    fireEvent(window, new PopStateEvent('popstate', { state: { command: 123 } }));
    await act(() => vi.advanceTimersByTimeAsync(1000));
    expect(screen.getByRole('heading', { name: 'Blog Posts:' })).toBeInTheDocument();
    window.history.replaceState(null, '', '/');
    fireEvent(window, new PopStateEvent('popstate'));
    await act(() => vi.advanceTimersByTimeAsync(1000));
    expect(screen.getByText('Available Commands:')).toBeInTheDocument();
  });
});
