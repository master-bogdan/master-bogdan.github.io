import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import type { CommandHandler } from '../types';
import { commandStyles } from './styles';

export const resumeCommand: CommandHandler = () => {
  return (
    <Box>
      <Typography sx={commandStyles.title}>Resume / CV</Typography>
      <Typography sx={commandStyles.text}>View my professional experience on LinkedIn:</Typography>
      <Link
        href="https://www.linkedin.com/in/b-shchavinskyi-fullstack"
        target="_blank"
        rel="noopener noreferrer"
        sx={commandStyles.downloadLink}
      >
        [View LinkedIn profile]
      </Link>
    </Box>
  );
};
