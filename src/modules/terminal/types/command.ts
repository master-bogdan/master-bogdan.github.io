import type { ReactNode } from 'react';

export type CommandHandler = (args: readonly string[]) => ReactNode;

export type CommandView = 'terminal' | 'article';

export type Command = {
  readonly name: string;
  readonly description: string;
  readonly displayName?: string;
  readonly view?: (args: readonly string[]) => CommandView;
  readonly execute: CommandHandler;
  readonly href?: (args: readonly string[]) => string | undefined;
  readonly hidden?: boolean;
};

export type CommandOutput = {
  readonly id: number;
  readonly command: string;
  readonly output: ReactNode;
};
