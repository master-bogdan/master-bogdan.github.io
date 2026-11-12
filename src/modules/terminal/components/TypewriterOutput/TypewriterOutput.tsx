import Box from '@mui/material/Box';
import {
  useEffect,
  useEffectEvent,
  useState,
  useSyncExternalStore,
  type ReactElement,
  type ReactNode,
} from 'react';

import { TerminalTimings } from '../../constants';
import { countCharacters, sliceContent } from '../../utils';
import { typewriterStyles } from './styles';

// Keep complete server content through hydration, then begin the browser animation.
const subscribe = (): (() => void) => () => {};
const getClientSnapshot = (): boolean => true;
const getServerSnapshot = (): boolean => false;

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
  const isInteractive = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
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

  if (!isInteractive || characterCount >= totalCharacters) {
    return (
      <Box sx={typewriterStyles.root} data-typewriter-pending={isInteractive ? undefined : ''}>
        {children}
      </Box>
    );
  }

  const [visibleContent] = sliceContent(children, characterCount);
  return <Box sx={typewriterStyles.root}>{visibleContent}</Box>;
}
