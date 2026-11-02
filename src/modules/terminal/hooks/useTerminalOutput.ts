import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';

import type { CommandOutput } from '../types';

type TerminalOutputController = {
  readonly clearOutput: () => void;
  readonly currentOutput: CommandOutput | null;
  readonly outputRef: RefObject<HTMLDivElement | null>;
  readonly showOutput: (command: string, output: ReactNode, delayMs?: number) => void;
};

export const useTerminalOutput = (): TerminalOutputController => {
  const [currentOutput, setCurrentOutput] = useState<CommandOutput | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const nextOutputIdRef = useRef(1);
  const timersRef = useRef(new Set<number>());

  useEffect(() => {
    const timers = timersRef.current;

    return () => {
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [currentOutput]);

  const cancelPendingOutputs = (): void => {
    for (const timer of timersRef.current) {
      window.clearTimeout(timer);
    }

    timersRef.current.clear();
  };

  const clearOutput = (): void => {
    cancelPendingOutputs();
    setCurrentOutput(null);
  };

  const showOutput = (command: string, output: ReactNode, delayMs = 0): void => {
    const commandOutput = { id: nextOutputIdRef.current, command, output };
    nextOutputIdRef.current += 1;

    if (delayMs === 0) {
      cancelPendingOutputs();
      setCurrentOutput(commandOutput);
      return;
    }

    const timer = window.setTimeout(() => {
      timersRef.current.delete(timer);
      setCurrentOutput(commandOutput);
    }, delayMs);

    timersRef.current.add(timer);
  };

  return {
    clearOutput,
    currentOutput,
    outputRef,
    showOutput,
  };
};
