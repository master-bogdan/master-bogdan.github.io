import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Terminal } from '..';

describe('Contact & CV', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it.each(['/contacts/', '/resume/'])(
    'offers contact links and a CV download at %s',
    async (pathname) => {
      window.history.replaceState(null, '', pathname);
      render(<Terminal initialPath={pathname} />);
      await act(() => vi.advanceTimersByTimeAsync(5000));

      expect(screen.getByRole('heading', { name: 'Contact & CV' })).toBeInTheDocument();
      const download = screen.getByRole('link', { name: 'Download CV (PDF)' });
      expect(download).toHaveAttribute('href', '/Bogdan_Shchavinskyi_CV.pdf');
      expect(download).toHaveAttribute('download', 'Bogdan_Shchavinskyi_CV.pdf');
      expect(screen.getByRole('link', { name: 'bshchavinskyi@gmail.com' })).toHaveAttribute(
        'href',
        'mailto:bshchavinskyi@gmail.com',
      );
      expect(screen.getByRole('link', { name: 'View LinkedIn profile' })).toHaveAttribute(
        'href',
        'https://www.linkedin.com/in/b-shchavinskyi-fullstack',
      );
      expect(screen.getByRole('link', { name: 'View GitHub profile' })).toHaveAttribute(
        'href',
        'https://github.com/master-bogdan',
      );
      expect(screen.getAllByRole('link', { name: 'Contact & CV' })).toHaveLength(1);
      expect(screen.queryByRole('link', { name: 'resume' })).not.toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Terminal command' })).toHaveFocus();
    },
  );
  it.each([
    ['contacts', '/contacts/'],
    ['resume', '/resume/'],
  ])('opens the %s command at %s', async (command, pathname) => {
    window.history.replaceState(null, '', '/projects/');
    render(<Terminal initialPath="/projects/" />);
    const input = screen.getByRole('textbox', { name: 'Terminal command' });
    fireEvent.change(input, { target: { value: command } });
    fireEvent.submit(input.closest('form')!);
    await act(() => vi.advanceTimersByTimeAsync(5000));

    expect(window.location.pathname).toBe(pathname);
    expect(screen.getByRole('heading', { name: 'Contact & CV' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download CV (PDF)' })).toBeInTheDocument();
    expect(input).toHaveFocus();
  });
});
