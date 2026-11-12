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
    window.history.replaceState(null, '', '/');
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
    await act(() => vi.advanceTimersByTimeAsync(40_000));
    expect(screen.getByText('Bogdan Shchavinskyi')).toBeInTheDocument();
    expect(screen.getByText(/8\+ years building software products/)).toBeInTheDocument();
    expect(screen.getByText('~$200K/year')).toBeInTheDocument();
    expect(screen.getByText('~2 min → 20 sec')).toBeInTheDocument();
    expect(screen.getByText('~8 GB → 700 MB')).toBeInTheDocument();
    expect(screen.getByText(/application I took over and later led/)).toBeInTheDocument();
    expect(screen.getByText('MCP integrations')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Certified Kubernetes Administrator (CKA)' }),
    ).toHaveAttribute('src', '/certifications/cka.svg');
    expect(
      screen.getByRole('img', { name: 'Certified Kubernetes Application Developer (CKAD)' }),
    ).toHaveAttribute('src', '/certifications/ckad.svg');
    expect(screen.getByText('Certified Kubernetes Administrator (CKA)')).toBeInTheDocument();
    expect(
      screen.getByText('Certified Kubernetes Application Developer (CKAD)'),
    ).toBeInTheDocument();

    await submitCommand(input, 'projects');
    expect(screen.getByText('Featured Projects:')).toBeInTheDocument();

    await submitCommand(input, 'contacts');
    expect(screen.getByText('Contact Information:')).toBeInTheDocument();

    await submitCommand(input, 'resume');
    expect(screen.getByRole('link', { name: '[View LinkedIn profile]' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/b-shchavinskyi-fullstack',
    );
    const resumeLink = screen.getByRole('link', { name: '[Download PDF]' });
    expect(resumeLink).toHaveAttribute('href', '/Bogdan_Shchavinskyi_CV.pdf');
    expect(resumeLink).toHaveAttribute('download', 'Bogdan_Shchavinskyi_CV.pdf');

    await submitCommand(input, 'does-not-exist');
    expect(screen.getByText(/Command not found: does-not-exist/)).toBeInTheDocument();
  });

  it('lists and opens authored Markdown posts', async () => {
    const input = await bootTerminal();

    await submitCommand(input, 'blog');
    const postLink = screen.getByRole('link', { name: 'Welcome to My Terminal' });
    fireEvent.click(postLink);
    await act(() => vi.advanceTimersByTimeAsync(20_000));

    expect(screen.getByRole('heading', { name: 'Welcome to My Terminal' })).toBeInTheDocument();
    expect(screen.getByText(/Why a Terminal?/)).toBeInTheDocument();

    await submitCommand(input, 'blog missing');
    expect(screen.getByText(/Post 'missing' not found/)).toBeInTheDocument();
  });

  it('renders a complete long blog post without advancing typing timers', async () => {
    const input = await bootTerminal();
    fireEvent.change(input, { target: { value: 'BLOG ai-slop-era' } });
    const form = input.closest('form');

    if (!form) {
      throw new Error('Terminal command input must belong to a form');
    }

    fireEvent.submit(form);

    expect(screen.getByText(/Keep the garbage out of your project/)).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(4);
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
