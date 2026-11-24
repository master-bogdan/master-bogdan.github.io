import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Terminal } from '..';

describe('Article reading', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());
  it('opens a complete article without terminal controls', () => {
    render(<Terminal initialPath="/blog/lost-interest-found-again/" />);

    const article = screen.getByRole('article');
    expect(within(article).getByText(/My favorite animal is octopus/)).toBeInTheDocument();
    expect(within(article).getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(within(article).getByRole('img', { name: /^Article artwork for/ })).toHaveAttribute(
      'src',
      '/blog/lost-interest-found-again-header.png',
    );
    expect(screen.queryByRole('textbox', { name: 'Terminal command' })).not.toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /^Bogdan Shchavinskyi/ })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Terminal' })).toHaveAttribute('href', '/');
  });
  it('returns to help and resets the banner without restarting boot', async () => {
    window.history.replaceState(null, '', '/blog/welcome/');
    render(<Terminal initialPath="/blog/welcome/" />);
    fireEvent.click(screen.getByRole('link', { name: 'Terminal' }));

    expect(window.location.pathname).toBe('/');
    expect(screen.queryByText('Initializing system...')).not.toBeInTheDocument();
    const input = screen.getByRole('textbox', { name: 'Terminal command' });
    expect(input).toHaveFocus();
    await act(() => vi.advanceTimersByTimeAsync(5000));
    expect(screen.getByText('Available Commands:')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'whoami' } });
    fireEvent.submit(input.closest('form')!);
    fireEvent.click(screen.getByRole('link', { name: 'Reset terminal' }));
    await act(() => vi.advanceTimersByTimeAsync(5000));

    expect(screen.getByText('Available Commands:')).toBeInTheDocument();
    expect(screen.queryByText('Initializing system...')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Terminal command' })).toHaveFocus();
  });
});
