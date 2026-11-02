import { useState, type RefObject } from 'react';

import { TerminalTimings } from '../constants';
import { commandRegistry, getVisibleCommands, unknownCommand } from '../commands';
import type { CommandContext, CommandOutput } from '../types';
import { useTerminalOutput } from './useTerminalOutput';

const ClearCommandName = 'clear';
const HelpCommandName = 'help';
const visibleCommands = getVisibleCommands();

type TerminalController = {
  readonly completeBoot: () => void;
  readonly currentOutput: CommandOutput | null;
  readonly executeCommand: (input: string) => void;
  readonly isBooting: boolean;
  readonly outputRef: RefObject<HTMLDivElement | null>;
  readonly visibleCommands: readonly string[];
};

export const useTerminal = (): TerminalController => {
  const [isBooting, setIsBooting] = useState(true);
  const { clearOutput, currentOutput, outputRef, showOutput } = useTerminalOutput();

  const executeCommand = (input: string): void => {
    const [commandName, ...args] = input.trim().toLowerCase().split(/\s+/);
    const commandContext: CommandContext = { executeCommand };

    if (commandName === ClearCommandName) {
      clearOutput();
      showOutput(HelpCommandName, commandRegistry[HelpCommandName].execute([], commandContext), {
        delayMs: TerminalTimings.CLEAR_HELP_DELAY_MS,
      });
      return;
    }

    const command = commandRegistry[commandName];
    const output = command ? command.execute(args, commandContext) : unknownCommand(commandName);

    showOutput(input, output, { animate: command?.animateOutput ?? true });
  };

  const completeBoot = (): void => {
    setIsBooting(false);
    showOutput(HelpCommandName, commandRegistry[HelpCommandName].execute([], { executeCommand }), {
      delayMs: TerminalTimings.HELP_DELAY_MS,
    });
  };

  return {
    completeBoot,
    currentOutput,
    executeCommand,
    isBooting,
    outputRef,
    visibleCommands,
  };
};
