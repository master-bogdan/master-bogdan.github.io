import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Viewport scrolling is a browser boundary absent from jsdom; Playwright covers it.
vi.stubGlobal('scrollTo', vi.fn());
