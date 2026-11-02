import type { ReactNode } from 'react';

export type CommandContext = {
  readonly executeCommand: (input: string) => void;
};

export type CommandHandler = (args: readonly string[], context: CommandContext) => ReactNode;

export type Command = {
  readonly name: string;
  readonly description: string;
  readonly execute: CommandHandler;
  readonly hidden?: boolean;
};

export type CommandOutput = {
  readonly id: number;
  readonly command: string;
  readonly output: ReactNode;
};
