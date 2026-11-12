export const typewriterStyles = {
  root: {
    'html.js &[data-typewriter-pending]': {
      visibility: 'hidden',
      animation: 'revealPendingOutput 0s 3s forwards',
    },
    '@keyframes revealPendingOutput': {
      to: { visibility: 'visible' },
    },
  },
} as const;
