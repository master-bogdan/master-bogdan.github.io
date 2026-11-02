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
        <Box ref={outputRef} sx={terminalStyles.output}>
          {isBooting ? <BootSequence onComplete={completeBoot} /> : null}
          {!isBooting ? (
            <>
              <Banner />
              <QuickCommands commands={visibleCommands} onCommand={executeCommand} />
            </>
          ) : null}
          {currentOutput ? (
            <Box sx={terminalStyles.currentOutput}>
              <Box sx={terminalStyles.commandLabel}>$ {currentOutput.command}</Box>
              <TypewriterOutput key={currentOutput.id}>{currentOutput.output}</TypewriterOutput>
            </Box>
          ) : null}
        </Box>
        {!isBooting ? <CommandInput onCommand={executeCommand} /> : null}
      </Container>
    </Box>
  );
}
