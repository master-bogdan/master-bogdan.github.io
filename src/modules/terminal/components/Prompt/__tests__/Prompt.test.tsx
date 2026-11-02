import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Prompt } from '..';

describe('Prompt', () => {
  it('shows the terminal identity and cursor', () => {
    const { container } = render(<Prompt />);

    expect(screen.getByText('bogdan@homelab')).toBeInTheDocument();
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('can hide its cursor', () => {
    const { container } = render(<Prompt showCursor={false} />);

    expect(container.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument();
  });
});
