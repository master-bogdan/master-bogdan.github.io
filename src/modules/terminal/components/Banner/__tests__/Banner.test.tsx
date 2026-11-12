import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Banner } from '..';

describe('Banner', () => {
  it('shows the portfolio banner', () => {
    render(<Banner />);

    expect(
      screen.getByRole('img', {
        name: 'Bogdan Shchavinskyi — Senior Software Engineer & Tech Lead — Building software products, cloud platforms, and agentic AI workflows — from architecture to production.',
      }),
    ).toHaveAttribute('src', '/banner.svg');
  });
});
