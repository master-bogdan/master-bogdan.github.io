import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import type { ReactElement } from 'react';

import { commandHref, commandRegistry } from '../../commands';
import { quickCommandsStyles } from './styles';

type QuickCommandsProps = {
  readonly commands: readonly string[];
  readonly onCommand: (command: string) => void;
};

export function QuickCommands({ commands, onCommand }: QuickCommandsProps): ReactElement {
  return (
    <Box sx={quickCommandsStyles.root}>
      {commands.map((command) => {
        const href = commandHref(command);
        const label = commandRegistry[command]?.displayName ?? command;
        return href ? (
          <Chip
            key={command}
            component="a"
            href={href}
            label={label}
            clickable
            sx={quickCommandsStyles.command}
          />
        ) : (
          <Chip
            key={command}
            label={label}
            onClick={() => onCommand(command)}
            sx={quickCommandsStyles.command}
          />
        );
      })}
    </Box>
  );
}
