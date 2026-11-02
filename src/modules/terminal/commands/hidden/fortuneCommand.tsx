import Typography from '@mui/material/Typography';

import type { CommandHandler } from '../../types';
import { hiddenCommandStyles } from './styles';

const Fortunes = [
  'You will write bug-free code today... just kidding!',
  'A merge conflict approaches. Prepare yourself.',
  'Your next commit will be legendary.',
  'The production server is stable... for now.',
  'Coffee levels are optimal for coding.',
  'A wild segfault appears!',
  'Your code will compile on the first try. (Unlikely)',
  "The cloud is just someone else's computer.",
] as const;

export const fortuneCommand: CommandHandler = () => {
  const fortuneIndex = Math.floor(Math.random() * Fortunes.length);
  return <Typography sx={hiddenCommandStyles.greenText}>{Fortunes[fortuneIndex]}</Typography>;
};
