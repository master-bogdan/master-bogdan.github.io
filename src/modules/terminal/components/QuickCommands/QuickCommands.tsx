import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import type { ReactElement } from 'react';

import { quickCommandsStyles } from './styles';

type QuickCommandsProps = {
  readonly commands: readonly string[];
  readonly onCommand: (command: string) => void;
};

export function QuickCommands({ commands, onCommand }: QuickCommandsProps): ReactElement {
  return (
    <Box sx={quickCommandsStyles.root}>
      {commands.map((command) => (
        <Chip
          key={command}
          label={command}
          onClick={() => onCommand(command)}
          sx={quickCommandsStyles.command}
        />
      ))}
    </Box>
  );
}
