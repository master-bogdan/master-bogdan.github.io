import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';

import type { Command } from '../types';
import { commandStyles } from './styles';

export const helpCommand = (
  args: readonly string[],
  commands: readonly Command[],
): ReactElement => {
  const shouldShowHidden = args.includes('--hidden');
  const displayedCommands = commands.filter((command) => {
    return shouldShowHidden ? command.hidden : !command.hidden;
  });

  return (
    <Box>
      <Typography sx={shouldShowHidden ? commandStyles.hiddenTitle : commandStyles.title}>
        {shouldShowHidden ? '🎉 Secret Hidden Commands:' : 'Available Commands:'}
      </Typography>
      {displayedCommands.map((command) => (
        <Box key={command.name} sx={commandStyles.commandRow}>
          <Typography
            sx={shouldShowHidden ? commandStyles.hiddenCommandName : commandStyles.commandName}
          >
            {command.name}
          </Typography>
          <Typography sx={commandStyles.commandDescription}>- {command.description}</Typography>
        </Box>
      ))}
      <Typography sx={commandStyles.helpFooter}>
        {shouldShowHidden
          ? 'Congratulations on finding the secret! 🎊'
          : 'Hint: Try exploring for hidden commands...'}
      </Typography>
    </Box>
  );
};
