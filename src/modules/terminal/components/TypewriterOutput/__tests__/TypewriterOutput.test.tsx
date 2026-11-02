import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { TypewriterOutput } from '..';

describe('TypewriterOutput', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('reveals nested content and reports completion', async () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(
      <TypewriterOutput speed={10} onComplete={onComplete}>
        <span>Hello</span> world
      </TypewriterOutput>,
    );

    await act(() => vi.advanceTimersByTimeAsync(120));

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText(/world/)).toBeInTheDocument();
    expect(onComplete).toHaveBeenCalledOnce();
  });
});
