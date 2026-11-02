import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import type { CommandHandler } from '../types';
import { commandStyles } from './styles';

export const contactsCommand: CommandHandler = () => {
  return (
    <Box>
      <Typography sx={commandStyles.title}>Contact Information:</Typography>
      <Typography sx={commandStyles.text}>
        Email:{' '}
        <Link href="mailto:bshchavinskyi@gmail.com" sx={commandStyles.link}>
          bshchavinskyi@gmail.com
        </Link>
      </Typography>
      <Typography sx={commandStyles.text}>
        GitHub:{' '}
        <Link
          href="https://github.com/master-bogdan"
          target="_blank"
          rel="noopener noreferrer"
          sx={commandStyles.link}
        >
          github.com/master-bogdan
        </Link>
      </Typography>
      <Typography sx={commandStyles.text}>
        LinkedIn:{' '}
        <Link
          href="https://www.linkedin.com/in/b-shchavinskyi-fullstack"
          target="_blank"
          rel="noopener noreferrer"
          sx={commandStyles.link}
        >
          linkedin.com/in/b-shchavinskyi-fullstack
        </Link>
      </Typography>
    </Box>
  );
};
