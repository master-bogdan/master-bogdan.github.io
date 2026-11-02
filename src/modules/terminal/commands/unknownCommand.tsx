import Box from '@mui/material/Box';
import type { ReactElement } from 'react';

import { commandStyles } from './styles';

export const unknownCommand = (commandName: string): ReactElement => {
  return (
    <Box sx={commandStyles.unknownCommand}>
      Command not found: {commandName}
      <br />
      Type &apos;help&apos; for available commands.
    </Box>
  );
};
