import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from '../App';

describe('App', () => {
  it('exposes the interactive portfolio terminal', () => {
    render(<App />);

    expect(
      screen.getByRole('main', { name: 'Interactive portfolio terminal' }),
    ).toBeInTheDocument();
  });
});
