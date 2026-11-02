import Box from '@mui/material/Box';
import { useEffect, useEffectEvent, useState, type ReactElement, type ReactNode } from 'react';

import { TerminalTimings } from '../../constants';
import { countCharacters, sliceContent } from '../../utils';

type TypewriterOutputProps = {
  readonly children: ReactNode;
  readonly speed?: number;
  readonly onComplete?: () => void;
};

export function TypewriterOutput({
  children,
  speed = TerminalTimings.OUTPUT_TYPING_SPEED_MS,
  onComplete,
}: TypewriterOutputProps): ReactElement {
  const [characterCount, setCharacterCount] = useState(0);
  const totalCharacters = countCharacters(children);
  const notifyComplete = useEffectEvent(() => onComplete?.());

  useEffect(() => {
    let nextCharacterCount = 0;

    const timer = window.setInterval(() => {
      if (nextCharacterCount < totalCharacters) {
        nextCharacterCount += 1;
        setCharacterCount(nextCharacterCount);
        return;
      }

      window.clearInterval(timer);
      notifyComplete();
    }, speed);

    return () => window.clearInterval(timer);
  }, [speed, totalCharacters]);

  if (characterCount >= totalCharacters) {
    return <Box>{children}</Box>;
  }

  const [visibleContent] = sliceContent(children, characterCount);
  return <Box>{visibleContent}</Box>;
}
