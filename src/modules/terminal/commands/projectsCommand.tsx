import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { CommandHandler } from '../types';
import { commandStyles } from './styles';

export const projectsCommand: CommandHandler = () => {
  return (
    <Box>
      <Typography sx={commandStyles.title}>Featured Projects:</Typography>
      <Typography sx={commandStyles.indentedText}>In development</Typography>
    </Box>
  );
};
