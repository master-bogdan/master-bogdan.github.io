import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Terminal } from '..';

const renderUntilPrompt = async () => {
  render(<Terminal />);

  for (let step = 0; step < 60; step += 1) {
    const input = screen.queryByRole('textbox', { name: 'Terminal command' });

    if (input) {
      return input;
    }

    await act(() => vi.advanceTimersByTimeAsync(100));
  }

  return screen.getByRole('textbox', { name: 'Terminal command' });
};

const bootTerminal = async () => {
  const input = await renderUntilPrompt();
  await act(() => vi.advanceTimersByTimeAsync(20_000));
  return input;
};

const submitCommand = async (input: HTMLElement, command: string) => {
  fireEvent.change(input, { target: { value: command } });
  const form = input.closest('form');

  expect(form).not.toBeNull();
  if (!form) {
    throw new Error('Terminal command input must belong to a form');
  }

  fireEvent.submit(form);
  await act(() => vi.advanceTimersByTimeAsync(20_000));
};

describe('Terminal', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('keeps a command entered immediately after boot', async () => {
    const input = await renderUntilPrompt();

    await submitCommand(input, 'whoami');

    expect(screen.getByText('Bogdan Shchavinskyi')).toBeInTheDocument();
  });

  it('runs visible commands and reports unknown commands', async () => {
    const input = await bootTerminal();

    fireEvent.click(screen.getByRole('button', { name: 'whoami' }));
    await act(() => vi.advanceTimersByTimeAsync(20_000));
    expect(screen.getByText('Bogdan Shchavinskyi')).toBeInTheDocument();
    expect(screen.getByText(/7\+ years building and evolving/)).toBeInTheDocument();
    expect(screen.getByText('~$200K/year')).toBeInTheDocument();
    expect(screen.getByText('68–70%')).toBeInTheDocument();
    expect(screen.getByText('50%+')).toBeInTheDocument();

    await submitCommand(input, 'projects');
    expect(screen.getByText('Featured Projects:')).toBeInTheDocument();

    await submitCommand(input, 'contacts');
    expect(screen.getByText('Contact Information:')).toBeInTheDocument();

    await submitCommand(input, 'resume');
    expect(screen.getByRole('link', { name: '[View LinkedIn profile]' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/b-shchavinskyi-fullstack',
    );
    expect(screen.queryByRole('link', { name: '[Download PDF]' })).not.toBeInTheDocument();

    await submitCommand(input, 'does-not-exist');
    expect(screen.getByText(/Command not found: does-not-exist/)).toBeInTheDocument();
  });

  it('lists and opens authored Markdown posts', async () => {
    const input = await bootTerminal();

    await submitCommand(input, 'blog');
    const postLink = screen.getByRole('button', { name: 'Welcome to My Terminal' });
    fireEvent.click(postLink);
    await act(() => vi.advanceTimersByTimeAsync(20_000));

    expect(screen.getByRole('heading', { name: 'Welcome to My Terminal' })).toBeInTheDocument();
    expect(screen.getByText(/Why a Terminal?/)).toBeInTheDocument();

    await submitCommand(input, 'blog missing');
    expect(screen.getByText(/Post 'missing' not found/)).toBeInTheDocument();
  });

  it('runs every hidden command and clears back to help', async () => {
    const input = await bootTerminal();
    const hiddenCommands = [
      'neofetch',
      'sudo',
      'hack',
      'fortune',
      'cowsay clean code',
      'matrix',
      'rickroll',
      'coffee',
    ];

    for (const command of hiddenCommands) {
      await submitCommand(input, command);
      expect(screen.getByText(`$ ${command}`)).toBeInTheDocument();
    }

    await submitCommand(input, 'help --hidden');
    expect(screen.getByText('🎉 Secret Hidden Commands:')).toBeInTheDocument();

    await submitCommand(input, 'clear');
    await act(() => vi.advanceTimersByTimeAsync(20_000));
    expect(screen.getByText('Available Commands:')).toBeInTheDocument();
  });
});
