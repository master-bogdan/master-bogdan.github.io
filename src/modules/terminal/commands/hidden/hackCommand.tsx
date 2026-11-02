import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { CommandHandler } from '../../types';
import { hiddenCommandStyles } from './styles';

const HackLines = [
  'Initializing hack sequence...',
  'Connecting to mainframe...',
  'Bypassing firewall...',
  'Decrypting passwords...',
  'Accessing database...',
  'Downloading files...',
  'Covering tracks...',
  '',
  'HACK COMPLETE! 🎉',
  '',
  "Just kidding. Please don't hack anyone. 🙃",
] as const;

export const hackCommand: CommandHandler = () => {
  return (
    <Box>
      {HackLines.map((line, index) => (
        <Typography
          key={`${index}-${line}`}
          sx={
            line === 'HACK COMPLETE! 🎉'
              ? hiddenCommandStyles.completeLine
              : hiddenCommandStyles.line
          }
        >
          {line}
        </Typography>
      ))}
    </Box>
  );
};
