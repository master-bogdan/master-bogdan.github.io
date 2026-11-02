import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { CommandHandler } from '../../types';
import { hiddenCommandStyles } from './styles';

const Lyrics = [
  '♪ Never gonna give you up ♪',
  '♪ Never gonna let you down ♪',
  '♪ Never gonna run around and desert you ♪',
] as const;

export const rickrollCommand: CommandHandler = () => {
  return (
    <Box>
      {Lyrics.map((line) => (
        <Typography key={line} sx={hiddenCommandStyles.rickrollLine}>
          {line}
        </Typography>
      ))}
      <Typography sx={hiddenCommandStyles.rickrollMessage}>You just got rickrolled! 🎵</Typography>
      <Typography sx={hiddenCommandStyles.secondaryMessage}>
        (Opening YouTube would be too obvious...)
      </Typography>
    </Box>
  );
};
