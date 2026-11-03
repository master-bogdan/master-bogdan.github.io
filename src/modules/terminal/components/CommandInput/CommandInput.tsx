import Box from '@mui/material/Box';
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type ReactElement,
} from 'react';

import { TerminalTimings } from '../../constants';
import { Prompt } from '../Prompt';
import { commandInputStyles } from './styles';

type CommandInputProps = {
  readonly onCommand: (command: string) => void;
  readonly disabled?: boolean;
};

export function CommandInput({ onCommand, disabled = false }: CommandInputProps): ReactElement {
  const [input, setInput] = useState('');
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIsCursorVisible((isVisible) => !isVisible);
    }, TerminalTimings.CURSOR_BLINK_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = input.trim();

    if (command.length === 0) {
      return;
    }

    try {
      onCommand(command);
    } finally {
      setInput('');
      inputRef.current?.focus();
    }
  };

  const handleInputClick = (event: MouseEvent<HTMLInputElement>) => {
    const endPosition = event.currentTarget.value.length;
    event.currentTarget.setSelectionRange(endPosition, endPosition);
  };

  const cursorStyle = isCursorVisible
    ? commandInputStyles.visibleCursor
    : commandInputStyles.hiddenCursor;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={commandInputStyles.form}>
      <Prompt showCursor={false} />
      <Box sx={commandInputStyles.inputContainer}>
        <input
          ref={inputRef}
          aria-label="Terminal command"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onClick={handleInputClick}
          disabled={disabled}
          autoComplete="off"
          spellCheck={false}
          style={commandInputStyles.input}
        />
        <Box component="span" sx={commandInputStyles.visibleInput}>
          {input}
          <Box
            aria-hidden="true"
            data-terminal-cursor=""
            component="span"
            sx={[commandInputStyles.cursor, cursorStyle]}
          />
        </Box>
      </Box>
    </Box>
  );
}
