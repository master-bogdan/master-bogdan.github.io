import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { CommandHandler } from '../../types';
import { hiddenCommandStyles } from './styles';

const MatrixCharacters = '01アイウエオカキクケコサシスセソタチツテト';
const MatrixLineCount = 10;
const MatrixColumnCount = 60;

const createMatrixLine = (): string => {
  return Array.from({ length: MatrixColumnCount }, () => {
    const characterIndex = Math.floor(Math.random() * MatrixCharacters.length);
    return MatrixCharacters[characterIndex];
  }).join('');
};

export const matrixCommand: CommandHandler = () => {
  const lines = Array.from({ length: MatrixLineCount }, createMatrixLine);

  return (
    <Box>
      {lines.map((line, index) => (
        <Typography key={`${index}-${line}`} sx={hiddenCommandStyles.matrixLine}>
          {line}
        </Typography>
      ))}
      <Typography sx={hiddenCommandStyles.cyanMessage}>
        Wake up, Neo... The Matrix has you...
      </Typography>
    </Box>
  );
};
