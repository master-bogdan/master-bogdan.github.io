import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { CommandHandler } from '../../types';
import { hiddenCommandStyles } from './styles';

export const sudoCommand: CommandHandler = () => {
  return (
    <Box>
      <Typography sx={hiddenCommandStyles.spacedErrorText}>[sudo] password for bogdan:</Typography>
      <Typography sx={hiddenCommandStyles.spacedText}>Sorry, try again.</Typography>
      <Typography sx={hiddenCommandStyles.mutedText}>
        sudo: 3 incorrect password attempts
      </Typography>
      <Typography sx={hiddenCommandStyles.successMessage}>
        Just kidding! You don&apos;t need sudo here. 😉
      </Typography>
    </Box>
  );
};
