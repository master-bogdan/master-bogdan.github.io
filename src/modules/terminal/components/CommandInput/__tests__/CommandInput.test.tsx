import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { CommandInput } from '..';

describe('CommandInput', () => {
  it('submits a trimmed command and clears the prompt', async () => {
    const user = userEvent.setup();
    const onCommand = vi.fn();
    render(<CommandInput onCommand={onCommand} />);
    const input = screen.getByRole('textbox', { name: 'Terminal command' });

    await user.type(input, '  whoami  {Enter}');

    expect(onCommand).toHaveBeenCalledWith('whoami');
    expect(input).toHaveValue('');
  });

  it('ignores an empty command', async () => {
    const user = userEvent.setup();
    const onCommand = vi.fn();
    render(<CommandInput onCommand={onCommand} />);
    const input = screen.getByRole('textbox', { name: 'Terminal command' });

    await user.type(input, '   {Enter}');

    expect(onCommand).not.toHaveBeenCalled();
  });

  it('disables command entry while requested', () => {
    render(<CommandInput disabled onCommand={vi.fn()} />);

    expect(screen.getByRole('textbox', { name: 'Terminal command' })).toBeDisabled();
  });

  it('continues editing from the end after focus returns', async () => {
    const user = userEvent.setup();
    render(<CommandInput onCommand={vi.fn()} />);
    const input = screen.getByRole<HTMLInputElement>('textbox', {
      name: 'Terminal command',
    });

    await user.type(input, 'couple words');
    await user.tab();
    input.focus();
    input.setSelectionRange(0, 0);
    fireEvent.click(input);

    expect(input.selectionStart).toBe(input.value.length);
  });
});
