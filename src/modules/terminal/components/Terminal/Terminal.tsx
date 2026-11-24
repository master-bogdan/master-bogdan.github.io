import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import type { MouseEvent, ReactElement } from 'react';

import { appConfig, profile } from '@/config';
import { routeCommand } from '@/modules/navigation';

import { commandHref } from '../../commands';
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
  const outputRoute = routeCommand(commandHref(currentOutput?.command ?? '') ?? appConfig.basePath);
  const isReadingArticle = outputRoute?.startsWith('blog ') ?? false;
  const commandLabel = isReadingArticle ? (
    <TypewriterOutput key={currentOutput?.id}>$ {currentOutput?.command}</TypewriterOutput>
  ) : (
    `$ ${currentOutput?.command ?? ''}`
  );
  const output =
    currentOutput &&
    (isReadingArticle ? (
      currentOutput.output
    ) : (
      <TypewriterOutput key={currentOutput.id}>{currentOutput.output}</TypewriterOutput>
    ));

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
      <Container
        maxWidth={false}
        sx={[terminalStyles.container, isReadingArticle && terminalStyles.articleContainer]}
      >
        {!isBooting ? (
          <Box sx={terminalStyles.header}>
            {isReadingArticle ? (
              <Link href={appConfig.basePath} sx={terminalStyles.articleIdentity}>
                {profile.name}
              </Link>
            ) : (
              <Banner />
            )}
            <QuickCommands commands={visibleCommands} onCommand={executeCommand} />
          </Box>
        ) : null}
        {currentOutput ? <Box sx={terminalStyles.commandLabel}>{commandLabel}</Box> : null}
        <Box
          ref={outputRef}
          role="region"
          aria-label="Command output"
          tabIndex={0}
          sx={terminalStyles.output}
        >
          {isBooting ? <BootSequence onComplete={completeBoot} /> : null}
          {output}
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
