import { useEffect, useEffectEvent, useState, type RefObject } from 'react';

import { appConfig } from '@/config';
import { routeCommand } from '@/modules/navigation';

import { TerminalTimings } from '../constants';
import { commandHref, commandOutput, commandRegistry, getVisibleCommands } from '../commands';
import type { CommandOutput } from '../types';
import { useTerminalOutput } from './useTerminalOutput';

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

const savedHistoryCommand = (state: unknown): string | null => {
  if (typeof state !== 'object' || state === null || !('command' in state)) {
    return null;
  }
  return typeof state.command === 'string' ? state.command : null;
};

export const useTerminal = (
  initialPath: string,
  onNavigate?: (pathname: string) => void,
): TerminalController => {
  const initialCommand = routeCommand(initialPath);
  const [isBooting, setIsBooting] = useState(initialCommand === null);
  const { clearOutput, currentOutput, outputRef, showOutput } = useTerminalOutput(() =>
    initialCommand
      ? { id: 0, command: initialCommand, output: commandOutput(initialCommand), animate: false }
      : null,
  );

  const restoreLocation = useEffectEvent((event: PopStateEvent): void => {
    const command =
      savedHistoryCommand(event.state) ?? routeCommand(window.location.pathname) ?? HelpCommandName;
    setIsBooting(false);
    showOutput(command, commandOutput(command), { animate: false });
    onNavigate?.(window.location.pathname);
  });

  useEffect(() => {
    const handlePopState = (event: PopStateEvent): void => restoreLocation(event);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const executeCommand = (input: string): void => {
    const [name] = input.trim().toLowerCase().split(/\s+/);
    const isClear = name === 'clear';
    const historyCommand = isClear ? HelpCommandName : input;
    const href = commandHref(input) ?? appConfig.basePath;
    const state = { command: historyCommand };

    if (window.location.pathname !== href) {
      window.history.pushState(state, '', href);
    } else {
      window.history.replaceState(state, '', href);
    }
    onNavigate?.(href);

    if (isClear) {
      clearOutput();
      showOutput(HelpCommandName, commandOutput(HelpCommandName), {
        delayMs: TerminalTimings.CLEAR_HELP_DELAY_MS,
      });
      return;
    }

    showOutput(input, commandOutput(input), {
      animate: commandRegistry[name]?.animateOutput ?? true,
    });
  };

  const completeBoot = (): void => {
    setIsBooting(false);
    showOutput(HelpCommandName, commandOutput(HelpCommandName), {
      delayMs: TerminalTimings.HELP_DELAY_MS,
    });
  };

  return { completeBoot, currentOutput, executeCommand, isBooting, outputRef, visibleCommands };
};
