import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type { ReactElement } from 'react';

import { useTerminal } from '../../hooks';
import { Banner } from '../Banner';
import { BootSequence } from '../BootSequence';
import { CommandInput } from '../CommandInput';
import { QuickCommands } from '../QuickCommands';
import { TypewriterOutput } from '../TypewriterOutput';
import { terminalStyles } from './styles';

export function Terminal(): ReactElement {
  const { completeBoot, currentOutput, executeCommand, isBooting, outputRef, visibleCommands } =
    useTerminal();

  return (
    <Box sx={terminalStyles.viewport}>
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
            currentOutput.animate ? (
              <TypewriterOutput key={currentOutput.id}>{currentOutput.output}</TypewriterOutput>
            ) : (
              currentOutput.output
            )
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
