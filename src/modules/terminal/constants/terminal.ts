export const BootMessages = [
  'Initializing system...',
  'Loading kernel modules...',
  'Starting network services...',
  'Mounting file systems...',
  'Starting SSH daemon...',
  'Loading user profile...',
  'System ready.',
] as const;

export const PromptIdentity = {
  HOST: 'homelab',
  USER: 'bogdan',
} as const;

export const TerminalTimings = {
  BOOT_COMPLETE_DELAY_MS: 300,
  CLEAR_HELP_DELAY_MS: 100,
  CURSOR_BLINK_INTERVAL_MS: 530,
  HELP_DELAY_MS: 500,
  MESSAGE_TYPING_SPEED_MS: 20,
  OUTPUT_TYPING_SPEED_MS: 15,
} as const;
