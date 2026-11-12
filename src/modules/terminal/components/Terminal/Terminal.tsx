import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type { MouseEvent, ReactElement } from 'react';

import { appConfig } from '@/config';
import { routeCommand } from '@/modules/navigation';

import { useTerminal } from '../../hooks';
import { Banner } from '../Banner';
import { BootSequence } from '../BootSequence';
import { CommandInput } from '../CommandInput';
import { QuickCommands } from '../QuickCommands';
import { TypewriterOutput } from '../TypewriterOutput';
import { terminalStyles } from './styles';

type TerminalProps = {
  readonly initialPath?: string;
  readonly onNavigate?: (pathname: string) => void;
};

export function Terminal({
  initialPath = appConfig.basePath,
  onNavigate,
}: TerminalProps): ReactElement {
  const { completeBoot, currentOutput, executeCommand, isBooting, outputRef, visibleCommands } =
    useTerminal(initialPath, onNavigate);

  const handleLinkClick = (event: MouseEvent<HTMLElement>): void => {
    const isPlainClick =
      event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
    if (!isPlainClick || event.defaultPrevented || !(event.target instanceof Element)) {
      return;
    }
    const anchor = event.target.closest('a[href]');
    if (
      !(anchor instanceof HTMLAnchorElement) ||
      anchor.hasAttribute('download') ||
      anchor.target === '_blank'
    ) {
      return;
    }
    const url = new URL(anchor.href);
    const command = routeCommand(url.pathname);
    const isInternalContent =
      url.origin === window.location.origin && command !== null && !url.hash && !url.search;
    if (isInternalContent && command) {
      event.preventDefault();
      executeCommand(command);
    }
  };

  return (
    <Box sx={terminalStyles.viewport} onClick={handleLinkClick}>
      <Container maxWidth={false} sx={terminalStyles.container}>
        {!isBooting ? (
          <Box sx={terminalStyles.header}>
            <Banner />
            <QuickCommands commands={visibleCommands} onCommand={executeCommand} />
          </Box>
        ) : null}
        {currentOutput ? (
          <Box sx={terminalStyles.commandLabel}>$ {currentOutput.command}</Box>
        ) : null}
        <Box
          ref={outputRef}
          role="region"
          aria-label="Command output"
          tabIndex={0}
          sx={terminalStyles.output}
        >
          {isBooting ? <BootSequence onComplete={completeBoot} /> : null}
          {currentOutput ? (
            <TypewriterOutput key={currentOutput.id}>{currentOutput.output}</TypewriterOutput>
          ) : null}
        </Box>
        {!isBooting ? (
          <Box sx={terminalStyles.footer}>
            <CommandInput onCommand={executeCommand} />
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}
