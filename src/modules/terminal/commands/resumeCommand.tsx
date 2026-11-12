import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { appConfig, profile } from '@/config';

import type { CommandHandler } from '../types';
import { commandStyles } from './styles';
import { resumeStyles } from './resumeStyles';

export const resumeCommand: CommandHandler = () => {
  return (
    <Box sx={resumeStyles.root}>
      <Typography component="h1" sx={resumeStyles.name}>
        {profile.name}
      </Typography>
      <Typography sx={resumeStyles.role}>{profile.role}</Typography>
      <Box sx={resumeStyles.links}>
        <Link
          href={`${appConfig.basePath}${profile.resumeFileName}`}
          download={profile.resumeFileName}
          sx={commandStyles.downloadLink}
        >
          [Download PDF]
        </Link>
        <Link
          href={profile.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          sx={commandStyles.downloadLink}
        >
          [View LinkedIn profile]
        </Link>
      </Box>
    </Box>
  );
};
