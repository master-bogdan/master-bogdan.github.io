import Box from '@mui/material/Box';
import { useEffect, useRef, useState, type ReactElement } from 'react';

import { BootMessages, TerminalTimings } from '../../constants';
import { TypewriterOutput } from '../TypewriterOutput';
import { bootSequenceStyles } from './styles';

type BootSequenceProps = {
  readonly onComplete: () => void;
};

export function BootSequence({ onComplete }: BootSequenceProps): ReactElement {
  const [visibleMessages, setVisibleMessages] = useState<readonly string[]>([BootMessages[0]]);
  const completionTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(completionTimerRef.current);
  }, []);

  const handleMessageComplete = () => {
    const nextMessage = BootMessages[visibleMessages.length];

    if (nextMessage) {
      setVisibleMessages((messages) => [...messages, nextMessage]);
      return;
    }

    completionTimerRef.current = window.setTimeout(
      onComplete,
      TerminalTimings.BOOT_COMPLETE_DELAY_MS,
    );
  };

  return (
    <Box>
      {visibleMessages.map((message, index) => {
        const isCurrentMessage = index === visibleMessages.length - 1;

        return (
          <Box key={message} sx={bootSequenceStyles.message}>
            {isCurrentMessage ? (
              <TypewriterOutput
                speed={TerminalTimings.MESSAGE_TYPING_SPEED_MS}
                onComplete={handleMessageComplete}
              >
                [ OK ] {message}
              </TypewriterOutput>
            ) : (
              <>[ OK ] {message}</>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
