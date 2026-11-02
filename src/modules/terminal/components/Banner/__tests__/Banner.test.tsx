import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Banner } from '..';

describe('Banner', () => {
  it('shows the portfolio banner', () => {
    render(<Banner />);

    expect(
      screen.getByRole('img', {
        name: 'BogdanLabs.dev — Bogdan Shchavinskyi, Tech Lead and Senior Software Engineer',
      }),
    ).toHaveAttribute('src', '/banner.svg');
  });
});
