import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useEffect, type MouseEvent, type ReactElement } from 'react';

import { appConfig } from '@/config';
import { routeCommand } from '@/modules/navigation';

import { commandView } from '../../commands';
import { useTerminal } from '../../hooks';
import { ArticleHeader } from '../ArticleHeader';
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
  const isReadingArticle = commandView(currentOutput?.command ?? '') === 'article';
  const output =
    currentOutput &&
    (isReadingArticle ? (
      currentOutput.output
    ) : (
      <TypewriterOutput key={currentOutput.id}>{currentOutput.output}</TypewriterOutput>
    ));

  useEffect(() => {
    if (isReadingArticle) {
      window.scrollTo(0, 0);
    }
  }, [isReadingArticle, currentOutput?.id]);

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
    const isTerminalHome =
      url.pathname === appConfig.basePath || url.pathname === `${appConfig.basePath}index.html`;
    const command = isTerminalHome ? 'help' : routeCommand(url.pathname);
    const isInternalContent =
      url.origin === window.location.origin && command !== null && !url.hash && !url.search;
    if (isInternalContent && command) {
      event.preventDefault();
      executeCommand(command);
    }
  };

  return (
    <Box
      sx={[terminalStyles.viewport, isReadingArticle && terminalStyles.articleViewport]}
      onClick={handleLinkClick}
    >
      <Container
        maxWidth={false}
        sx={[
          terminalStyles.container,
          isBooting && terminalStyles.bootContainer,
          isReadingArticle && terminalStyles.articleContainer,
        ]}
      >
        {!isBooting && isReadingArticle ? <ArticleHeader /> : null}
        {!isBooting && !isReadingArticle ? (
          <Box sx={terminalStyles.header}>
            <Banner />
            <QuickCommands commands={visibleCommands} onCommand={executeCommand} />
          </Box>
        ) : null}
        {currentOutput && !isReadingArticle ? (
          <Box sx={terminalStyles.commandLabel}>$ {currentOutput.command}</Box>
        ) : null}
        <Box
          ref={outputRef}
          role="region"
          aria-label="Command output"
          tabIndex={0}
          sx={[terminalStyles.output, isReadingArticle && terminalStyles.articleOutput]}
        >
          {isBooting ? <BootSequence onComplete={completeBoot} /> : null}
          {output}
        </Box>
        {!isBooting && !isReadingArticle ? (
          <Box sx={terminalStyles.footer}>
            <CommandInput onCommand={executeCommand} outputId={currentOutput?.id} />
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}
