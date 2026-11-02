import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { appConfig } from '@/config';

import type { CommandHandler } from '../types';
import { commandStyles } from './styles';

const ResumeFileName = 'Bogdan_Shchavinskyi_CV.pdf';

export const resumeCommand: CommandHandler = () => {
  return (
    <Box>
      <Typography sx={commandStyles.title}>Resume / CV</Typography>
      <Typography sx={commandStyles.text}>Download my resume:</Typography>
      <Link
        href={`${appConfig.basePath}${ResumeFileName}`}
        download={ResumeFileName}
        sx={commandStyles.downloadLink}
      >
        [Download PDF]
      </Link>
      <Typography sx={commandStyles.resumeNote}>
        Or view my professional experience on LinkedIn:{' '}
        <Link
          href="https://www.linkedin.com/in/b-shchavinskyi-fullstack"
          target="_blank"
          rel="noopener noreferrer"
          sx={commandStyles.link}
        >
          [View LinkedIn profile]
        </Link>
      </Typography>
    </Box>
  );
};
